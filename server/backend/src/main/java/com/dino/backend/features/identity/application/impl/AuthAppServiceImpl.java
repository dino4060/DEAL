package com.dino.backend.features.identity.application.impl;

import com.dino.backend.features.identity.application.IAuthAppService;
import com.dino.backend.features.identity.application.ITokenAppService;
import com.dino.backend.features.identity.application.IUserAppService;
import com.dino.backend.features.identity.application.mapper.IUserMapper;
import com.dino.backend.features.identity.application.model.*;
import com.dino.backend.features.identity.domain.User;
import com.dino.backend.features.identity.domain.repository.IUserDomainRepository;
import com.dino.backend.infrastructure.aop.AppException;
import com.dino.backend.infrastructure.aop.ErrorCode;
import com.dino.backend.infrastructure.security.IOauth2InfraProvider;
import com.dino.backend.infrastructure.security.ISecurityInfraProvider;
import com.dino.backend.infrastructure.security.model.GoogleTokenResponse;
import com.dino.backend.infrastructure.security.model.GoogleUserResponse;
import com.dino.backend.infrastructure.security.model.JwtType;
import com.dino.backend.infrastructure.web.ICookieProvider;
import com.dino.backend.infrastructure.web.model.CurrentUser;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthAppServiceImpl implements IAuthAppService {

    ITokenAppService tokenAppService;

    IUserAppService userAppService;

    IUserDomainRepository userDomainRepository;

    IUserMapper userMapper;

    ISecurityInfraProvider securityInfraProvider;

    IOauth2InfraProvider oauth2InfraProvider;

    ICookieProvider cookieProvider;

    // QUERY //

    // findUserByIdentifier //
    private Optional<User> findUserByIdentifier(String email) {
        return this.userDomainRepository.findByEmail(email);
    }

    // LookupIdentifierResponse //
    @Override
    public LookupIdentifierResponse lookupIdentifier(String email) {
        Optional<User> userOpt = this.findUserByIdentifier(email);

        return LookupIdentifierResponse.builder()
                .isEmailProvided(userOpt.isPresent())
                .isPasswordProvided(userOpt.isPresent() && userOpt.get().getPassword() != null)
                .build();
    }

    // getCurrentUser //
    @Override
    public CurrentUserResponse getCurrentUser(CurrentUser currentUser) {
        // 1. Retrieve user from database based on the current user's ID.
        User user = this.userAppService.getUserById(currentUser.id());

        // 2. Return the user object after processing sensitive information (password, roles, etc.).
        return this.userMapper.toCurrentUserResponse(user);
    }

    // COMMAND //

    // authenticate //
    private AuthResponse authenticate(User user, HttpHeaders headers) {
        // get tokens
        String accessToken = this.securityInfraProvider.genToken(user, JwtType.ACCESS_TOKEN);
        String refreshToken = this.securityInfraProvider.genToken(user, JwtType.REFRESH_TOKEN);
        Duration refreshTokenTtl = this.securityInfraProvider.getTtl(JwtType.REFRESH_TOKEN);
        Instant refreshTokenExpiry = this.securityInfraProvider.getExpiry(JwtType.REFRESH_TOKEN);

        // update refresh token to database
        this.tokenAppService.updateRefreshToken(refreshToken, refreshTokenExpiry, user.getId());

        // set refresh token to cookie
        this.cookieProvider.attachRefreshToken(headers, refreshToken,refreshTokenTtl);

        return AuthResponse.builder()
                .isAuthenticated(true)
                .accessToken(accessToken)
                .currentUser(this.userMapper.toCurrentUserResponse(user))
                .build();
    }

    // unauthenticate //
    private AuthResponse unauthenticate(HttpHeaders headers) {
        this.cookieProvider.clearRefreshToken(headers);
        
        return AuthResponse.builder()
                .isAuthenticated(false)
                .build();
    }

    // login + PasswordLoginRequest //
    @Override
    public AuthResponse login(PasswordLoginRequest request, HttpHeaders headers) {
        // get user
        User user = this.findUserByIdentifier(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.AUTH__IDENTIFIER_NOT_FOUND));

        // match password
        if (!this.securityInfraProvider.matchPassword(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.AUTH__PASSWORD_INVALID);
        }

        // license token

        return this.authenticate(user, headers);
    }

    // signup + PasswordLoginRequest //
    @Override
    public AuthResponse signup(PasswordLoginRequest request, HttpHeaders headers) {
        // don't exist user
        if (this.findUserByIdentifier(request.getEmail()).isPresent()) {
            throw new AppException(ErrorCode.AUTH__IDENTIFIER_EXISTED);
        }

        // create
        User user = User.createSignupUser(
                this.userMapper.toUser(request),
                this.securityInfraProvider.hashPassword(request.getPassword())
        );
        user = this.userDomainRepository.save(user);

        // license token

        return this.authenticate(user, headers);
    }

    // signup + GoogleUserResponse //
    private AuthResponse signup(GoogleUserResponse request, HttpHeaders headers) {
        User user = User.createSignupUser(
                User.builder()
                        .email(request.getEmail())
                        .name(request.getName())
                        .gender(request.getGender())
                        .build(),
                null
        );
        user = this.userDomainRepository.save(user);

        return this.authenticate(user, headers);
    }

    // loginOrSignup + GoogleOauth2Request //
    @Override
    public AuthResponse loginOrSignup(GoogleOauth2Request request, HttpHeaders headers) {
        // exchange code for token //
        GoogleTokenResponse googleTokenResponse = this.oauth2InfraProvider.getGoogleToken(request.getCode());

        // get user //
        GoogleUserResponse googleUserResponse = this.oauth2InfraProvider.getGoogleUser(googleTokenResponse.getAccessToken());
        var userOpt = this.findUserByIdentifier(googleUserResponse.getEmail());

        // signup or login //
        AuthResponse authResponse;
        if (userOpt.isEmpty()) {
            authResponse = this.signup(googleUserResponse, headers);
        } else {
            authResponse = this.authenticate(userOpt.get(), headers);
        }

        return authResponse;
    }

    // refresh //
    @Override
    public AuthResponse refresh(String refreshToken, HttpHeaders headers) {
        // 1. Check null or empty
        if (refreshToken == null || refreshToken.isBlank()) {
            return this.unauthenticate(headers);
        }

        // 2. Verify & extract user ID
        String userId = this.securityInfraProvider.verifyToken(refreshToken, JwtType.REFRESH_TOKEN)
                .orElse(null);
        if (userId == null) {
            return this.unauthenticate(headers);
        }

        // 3. Check if refresh token matches DB (to prevent reuse)
        if (!this.tokenAppService.isRefreshTokenValid(refreshToken, userId)) {
            return this.unauthenticate(headers);
        }

        // 4. Get user
        User user = this.userAppService.getUserById(userId);

        // 5. authenticate successfully (license tokens, update DB & set cookie)
        return this.authenticate(user, headers);
    }

    // logout //
    @Override
    public AuthResponse logout(String refreshToken, HttpHeaders headers) {
        // 1. Check null or empty refresh token
        if (refreshToken == null || refreshToken.isBlank()) {
            return this.unauthenticate(headers);
        }

        // 2. Verify & extract user ID
        String userId = this.securityInfraProvider.verifyToken(refreshToken, JwtType.REFRESH_TOKEN)
                .orElse(null);
        if (userId == null) {
            return this.unauthenticate(headers);
        }

        // 3. Check if refresh token matches DB (to prevent reuse)
        if (!this.tokenAppService.isRefreshTokenValid(refreshToken, userId)) {
            return this.unauthenticate(headers);
        }

        // 4. Remove refresh token from DB (or set it as null)
        this.tokenAppService.updateRefreshToken("", null, userId);

        // 5. Clear refresh token in cookies
        this.cookieProvider.clearRefreshToken(headers);

        // Return unauthenticated response
        return AuthResponse.builder().isAuthenticated(true).build();
    }
}

