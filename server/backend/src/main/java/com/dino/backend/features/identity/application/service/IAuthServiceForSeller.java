package com.dino.backend.features.identity.application.service;

import com.dino.backend.features.identity.application.model.*;
import com.dino.backend.features.identity.application.pattern.IAuthTemplate;
import com.dino.backend.shared.api.model.CurrentUser;

public interface IAuthServiceForSeller extends IAuthTemplate {

    // QUERY //

    CurrentShopRes getCurrentShop(CurrentUser currentUser);
}
