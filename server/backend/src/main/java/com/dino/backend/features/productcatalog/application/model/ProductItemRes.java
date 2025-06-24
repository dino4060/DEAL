package com.dino.backend.features.productcatalog.application.model;

import java.time.Instant;

import com.dino.backend.features.pricing.application.model.ProductPriceRes;
import com.dino.backend.features.productcatalog.domain.model.ProductMeta;

public record ProductItemRes(
        Long id,
        String status,
        Instant updatedAt,
        String name,
        String thumb,
        ProductMeta meta,
        ProductPriceRes price
) {}
