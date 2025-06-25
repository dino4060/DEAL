package com.dino.backend.features.pricing.application.model;

public record ProductItemPriceRes(
        Long id,
        int mainPrice,
        int discountPercent,
        Integer sidePrice,

        Integer maxMainPrice,
        Integer maxDiscountPercent,
        Integer maxSidePrice
) {
}
