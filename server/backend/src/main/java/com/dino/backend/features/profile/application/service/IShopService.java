package com.dino.backend.features.profile.application.service;

import com.dino.backend.features.profile.application.model.VerifyShopReq;
import com.dino.backend.features.profile.application.model.VerifyShopRes;
import com.dino.backend.features.profile.domain.Shop;
import com.dino.backend.features.profile.domain.User;
import com.dino.backend.shared.api.model.CurrentUser;
import lombok.NonNull;

public interface IShopService {
    Shop getShop(@NonNull Long sellerId);

    void createShop(User seller);

    VerifyShopRes verifyShop(VerifyShopReq request, CurrentUser currentUser);
}
