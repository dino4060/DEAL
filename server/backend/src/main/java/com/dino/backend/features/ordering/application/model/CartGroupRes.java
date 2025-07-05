package com.dino.backend.features.ordering.application.model;

import com.dino.backend.features.profile.application.model.ShopLeanRes;

import java.util.List;

public record CartGroupRes(
        Long id,
        ShopLeanRes shop,
        List<CartItemRes> cartItems
) {
}
