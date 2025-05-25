package com.dino.backend.infrastructure.security.impl;

import org.springframework.stereotype.Service;

import com.dino.backend.infrastructure.aop.AppException;
import com.dino.backend.infrastructure.aop.ErrorCode;
import com.dino.backend.infrastructure.common.Env;
import com.dino.backend.infrastructure.security.IOauth2InfraProvider;
import com.dino.backend.infrastructure.security.httpclient.GoogleTokenClient;
import com.dino.backend.infrastructure.security.httpclient.GoogleUserClient;
import com.dino.backend.infrastructure.security.model.GoogleTokenRequest;
import com.dino.backend.infrastructure.security.model.GoogleTokenResponse;
import com.dino.backend.infrastructure.security.model.GoogleUserResponse;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class Oauth2InfraProviderImpl implements IOauth2InfraProvider {

    Env env;

    GoogleTokenClient googleTokenClient;

    GoogleUserClient googleUserClient;

    /**
     * // getGoogleToken //
     * 
     * @des To exchange authorizationCode for authorizationCode with GOOGLE
     * @param authorizationCode: String
     * @return accessToken,...: GoogleTokenResponse
     */
    @Override
    public GoogleTokenResponse getGoogleToken(String authorizationCode) {
        try {
            GoogleTokenResponse googleTokenResponse = this.googleTokenClient.getToken(
                    GoogleTokenRequest.builder()
                            .code(authorizationCode)
                            .clientId(this.env.CLIENT_ID)
                            .clientSecret(this.env.CLIENT_SECRET)
                            .redirectUri(this.env.REDIRECT_URI)
                            .grantType(this.env.GRANT_TYPE)
                            .build());

            return googleTokenResponse;

        } catch (Exception e) {
            log.error(">>> INTERNAL: getGoogleToken: {}", e.getMessage());
            throw new AppException(ErrorCode.OAUTH2__GET_GOOGLE_TOKEN_FAILED);
        }
    }

    /**
     * // getGoogleUser //
     * 
     * @des To get information of user of GOOGLE
     * @param accessToken: String
     * @return user: GoogleUserResponse
     */
    @Override
    public GoogleUserResponse getGoogleUser(String accessToken) {
        try {
            GoogleUserResponse googleUserResponse = this.googleUserClient.getUser("json", accessToken);

            return googleUserResponse;

        } catch (Exception e) {
            log.error(">>> INTERNAL: getGoogleUser: {}", e.getMessage());
            throw new AppException(ErrorCode.OAUTH2__GET_GOOGLE_USER_FAILED);
        }
    }
}
