package com.dino.backend.features.pricing.application.model;

public record ProductPriceRes(
        Long id,
        int mainPrice,
        Integer sidePrice,
        Integer discountPercent,

        Integer minMainPrice,
        Integer minSidePrice,
        Integer minDiscountPercent
) {
}
