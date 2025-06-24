package com.dino.backend.features.pricing.application.model;

public record PriceUpdateMessage(
        Long productId,
        Long skuId,
        Double newPrice
) {
}
