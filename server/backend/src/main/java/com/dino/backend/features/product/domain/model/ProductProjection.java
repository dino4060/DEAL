package com.dino.backend.features.product.domain.model;

import java.time.Instant;

import com.dino.backend.features.pricing.domain.ProductPrice;

public interface ProductProjection {
    Long getId();

    String getStatus();

    Instant getUpdatedAt();

    String getName();

    String getThumb();

    ProductMeta getMeta();

    ProductPrice getPrice();
}
