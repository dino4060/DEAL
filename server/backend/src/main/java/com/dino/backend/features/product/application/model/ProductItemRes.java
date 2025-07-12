package com.dino.backend.features.product.application.model;

import com.dino.backend.features.pricing.application.model.ProductItemPriceRes;
import com.dino.backend.features.product.domain.model.ProductMeta;

import java.time.Instant;

public record ProductItemRes(
        Long id,
        String status,
        Instant updatedAt,
        String name,
        String thumb,
        ProductMeta meta,
        ProductItemPriceRes price
) {
}
