package com.dino.backend.features.identity.application.mapper;

import com.dino.backend.features.identity.application.model.CurrentShopRes;
import com.dino.backend.features.identity.application.model.CurrentUserRes;
import com.dino.backend.features.profile.domain.User;
import com.dino.backend.features.profile.domain.Shop;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IAuthMapper {

    CurrentUserRes toCurrentUserRes(User user);

    CurrentShopRes toCurrentShopRes(Shop shop);
}
