package com.dino.backend.features.identity.application.pattern;

import com.dino.backend.features.identity.application.model.AuthEmailReq;
import com.dino.backend.features.identity.application.model.AuthRes;
import com.dino.backend.features.identity.application.model.CurrentUserRes;
import com.dino.backend.shared.api.model.CurrentUser;
import org.springframework.http.HttpHeaders;

public interface IAuthTemplate {

    // QUERY //

    CurrentUserRes getCurrentUser(CurrentUser currentUser);

    // COMMAND //

    AuthRes login(AuthEmailReq request, HttpHeaders headers);

    AuthRes signup(AuthEmailReq request, HttpHeaders headers);

    AuthRes refresh(String refreshToken, HttpHeaders headers);

    AuthRes logout(String refreshToken, HttpHeaders headers);

}
