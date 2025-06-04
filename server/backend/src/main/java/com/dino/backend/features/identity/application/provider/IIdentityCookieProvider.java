package com.dino.backend.features.identity.application.provider;

import org.springframework.http.HttpHeaders;

import java.time.Duration;

public interface IIdentityCookieProvider {

    void attachRefreshToken(HttpHeaders headers, String refreshToken, Duration ttl);

    void clearRefreshToken(HttpHeaders headers);
}
