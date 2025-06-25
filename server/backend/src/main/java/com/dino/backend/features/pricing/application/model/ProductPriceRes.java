package com.dino.backend.features.pricing.application.model;

import java.util.List;

public record ProductPriceRes(
        Long id,
        int mainPrice,
        int discountPercent,
        Integer sidePrice,

        Integer maxMainPrice,
        Integer maxDiscountPercent,
        Integer maxSidePrice,

        List<SkuPriceRes> skuPrices
) {
}
