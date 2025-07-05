package com.dino.backend.features.profile.application.service;

import com.dino.backend.features.profile.domain.Address;
import com.dino.backend.shared.api.model.CurrentUser;

public interface IAddressService {
    // QUERY //

    Address getDefault(CurrentUser currentUser);

    Address getDefault(Long userId);
}
