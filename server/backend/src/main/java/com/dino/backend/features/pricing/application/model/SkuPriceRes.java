package com.dino.backend.features.pricing.application.model;

public record SkuPriceRes(
        Long id,
        int mainPrice,
        int discountPercent,
        Integer sidePrice
) {
}
