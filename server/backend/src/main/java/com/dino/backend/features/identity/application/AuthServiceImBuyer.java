package com.dino.backend.features.identity.application;

import com.dino.backend.features.identity.application.model.AuthGoogleReq;
import com.dino.backend.features.identity.application.model.AuthRes;
import com.dino.backend.features.identity.application.model.LookupEmailRes;
import com.dino.backend.features.identity.application.pattern.AuthFacade;
import com.dino.backend.features.identity.application.pattern.AuthTemplate;
import com.dino.backend.features.identity.application.provider.IIdentityOauth2Provider;
import com.dino.backend.features.identity.application.service.IAuthServiceForBuyer;
import com.dino.backend.features.identity.domain.model.Role;
import com.dino.backend.features.profile.application.service.IUserService;
import com.dino.backend.features.profile.domain.User;
import com.dino.backend.shared.application.utils.AppUtils;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthServiceImBuyer extends AuthTemplate implements IAuthServiceForBuyer {

    AuthFacade authFacade;

    IUserService userService;

    IIdentityOauth2Provider oauth2Provider;

    public AuthServiceImBuyer(
            AuthFacade authFacade, IUserService userService, IIdentityOauth2Provider oauth2Provider
    ) {
        super(authFacade);
        this.authFacade = authFacade;
        this.userService = userService;
        this.oauth2Provider = oauth2Provider;
    }

    @Override
    protected Role getRole() {
        return Role.BUYER;
    }

    // QUERY //

    // lookupEmail //
    @Override
    public LookupEmailRes lookupEmail(String email) {
        User user = this.userService.findUserByEmail(email).orElse(null);

        boolean isEmailProvided = AppUtils.nonNull(user) && AppUtils.nonNull(user.getEmail());
        boolean isPasswordProvided = AppUtils.nonNull(user) && AppUtils.nonNull(user.getPassword());

        return new LookupEmailRes(isEmailProvided, isPasswordProvided);
    }

    // COMMAND //

    // login or signup + AuthGoogleRequest //
    @Override
    public AuthRes loginOrSignup(AuthGoogleReq request, HttpHeaders headers) {
        // authViaGoogle
        var googleUser = this.oauth2Provider.authViaGoogle(request.getCode());

        // get or create
        var user = this.userService
                .findUserByEmail(googleUser.getEmail())
                .orElseGet(() -> this.authFacade.createSignupUser(googleUser, this.getRole()));

        // license token
        return this.authFacade.inAuth(user, headers);
    }
}
