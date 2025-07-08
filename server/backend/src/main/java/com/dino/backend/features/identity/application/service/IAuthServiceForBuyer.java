package com.dino.backend.features.identity.application.service;

import com.dino.backend.features.identity.application.model.*;
import com.dino.backend.features.identity.application.pattern.IAuthTemplate;
import org.springframework.http.HttpHeaders;

import com.dino.backend.shared.api.model.CurrentUser;

public interface IAuthServiceForBuyer extends IAuthTemplate {

    // QUERY //

    LookupEmailRes lookupEmail(String email);

    // COMMAND //

    AuthRes loginOrSignup(AuthGoogleReq request, HttpHeaders headers);

}
