package com.dino.backend.features.identity.application.provider;

import java.util.Optional;

import com.dino.backend.features.identity.application.model.TokenPair;
import com.dino.backend.features.profile.domain.User;
import com.dino.backend.shared.application.utils.Id;

public interface IIdentitySecurityProvider {
    // PASSWORD //
    String hashPassword(String plain);

    boolean matchPassword(String plain, String hash);

    // JWT //
    TokenPair genTokenPair(User user);

    Optional<Id> verifyRefreshToken(String refreshToken);
}
