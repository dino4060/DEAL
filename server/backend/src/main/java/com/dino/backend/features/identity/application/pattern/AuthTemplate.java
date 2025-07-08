package com.dino.backend.features.identity.application.pattern;

import com.dino.backend.features.identity.application.model.*;
import com.dino.backend.features.identity.domain.Token;
import com.dino.backend.features.identity.domain.model.Role;
import com.dino.backend.features.profile.domain.User;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.application.utils.AppUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public abstract class AuthTemplate implements IAuthTemplate {

    AuthFacade authFacade;

    // TEMPLATE //

    protected abstract Role getRole();

    // QUERY //

    // getCurrentUser //
    public CurrentUserRes getCurrentUser(CurrentUser currentUser) {
        return this.authFacade.getCurrentUser(currentUser);
    }

    // COMMAND //

    // login + AuthEmailPassRequest //
    @Override
    public AuthRes login(AuthEmailReq request, HttpHeaders headers) {
        // checkEmail
        var user = this.authFacade.checkEmail(request.getEmail());

        // checkPassword
        this.authFacade.checkPassword(user, request.getPassword());

        // checkRole
        user = this.authFacade.checkOrAddRole(user, this.getRole());

        // license token
        return this.authFacade.inAuth(user, headers);
    }

    // signup + AuthEmailPassRequest //
    @Override
    @Transactional
    public AuthRes signup(AuthEmailReq request, HttpHeaders headers) {
        // checkEmailNotExists
        this.authFacade.checkEmailNotExists(request.getEmail());

        // createSignupUser
        User user = this.authFacade.createSignupUser(request, this.getRole());

        // license token
        return this.authFacade.inAuth(user, headers);
    }

    // refresh //
    @Override
    public AuthRes refresh(String refreshToken, HttpHeaders headers) {
        // checkRefreshToken
        Token token = this.authFacade.checkRefreshToken(refreshToken).orElse(null);

        if (AppUtils.isNull(token)) return this.authFacade.unAuth(headers);

        // authenticate successfully (license tokens, update DB & set cookie)
        return this.authFacade.inAuth(token.getUser(), headers);
    }

    // logout //
    @Override
    public AuthRes logout(String refreshToken, HttpHeaders headers) {
        // 1. checkRefreshToken
        Token token = this.authFacade.checkRefreshToken(refreshToken).orElse(null);

        if (AppUtils.isNull(token)) return this.authFacade.unAuth(headers);

        // 2. outAuth
        return this.authFacade.outAuth(token, headers);
    }
}
