package com.dino.backend.features.pricing.application.model;

public record SkuPriceRes(
        Long id,
        int mainPrice,
        Integer sidePrice,
        Integer discountPercent
) {
}
