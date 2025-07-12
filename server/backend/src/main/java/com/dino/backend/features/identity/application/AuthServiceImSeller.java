package com.dino.backend.features.identity.application;

import com.dino.backend.features.identity.application.mapper.IAuthMapper;
import com.dino.backend.features.identity.application.model.CurrentShopRes;
import com.dino.backend.features.identity.application.pattern.AuthFacade;
import com.dino.backend.features.identity.application.pattern.AuthTemplate;
import com.dino.backend.features.identity.application.service.IAuthServiceForSeller;
import com.dino.backend.features.identity.domain.model.Role;
import com.dino.backend.features.profile.application.service.IShopService;
import com.dino.backend.features.profile.domain.Shop;
import com.dino.backend.shared.api.model.CurrentUser;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthServiceImSeller extends AuthTemplate implements IAuthServiceForSeller {

    IShopService shopService;

    IAuthMapper authMapper;

    public AuthServiceImSeller(
            AuthFacade authFacade, IShopService shopService, IAuthMapper authMapper
    ) {
        super(authFacade);
        this.shopService = shopService;
        this.authMapper = authMapper;
    }

    @Override
    protected Role getRole() {
        return Role.SELLER;
    }

    // QUERY //

    // getCurrentShop //
    @Override
    public CurrentShopRes getCurrentShop(CurrentUser currentUser) {
        Shop shop = this.shopService.getShop(currentUser.id());

        return this.authMapper.toCurrentShopRes(shop);
    }
}
