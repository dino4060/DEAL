package com.dino.backend.features.identity.application.provider;

import com.dino.backend.features.identity.application.model.GoogleUserRes;

public interface IIdentityOauth2Provider {

    GoogleUserRes authViaGoogle(String code);
}
