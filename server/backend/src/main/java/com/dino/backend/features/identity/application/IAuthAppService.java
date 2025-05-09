package com.dino.backend.features.identity.application;

import com.dino.backend.features.identity.application.model.GoogleOauth2Request;
import com.dino.backend.features.identity.application.model.AuthResponse;
import com.dino.backend.features.identity.application.model.PasswordLoginRequest;
import org.springframework.http.HttpHeaders;

public interface IAuthAppService {

    AuthResponse login(PasswordLoginRequest request, HttpHeaders headers);

    AuthResponse signup(PasswordLoginRequest request, HttpHeaders headers);

    AuthResponse loginOrSignup(GoogleOauth2Request request, HttpHeaders headers);
}
