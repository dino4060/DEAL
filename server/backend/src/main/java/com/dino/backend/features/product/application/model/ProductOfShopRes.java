package com.dino.backend.features.product.application.model;

import java.util.List;

public record ProductOfShopRes(
        Long id,
        String status,
        String name,
        String thumb,
        int retailPrice,

        List<SkuRes> skus
) {
}
