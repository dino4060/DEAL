package com.dino.backend.features.ordering.application.model;

import com.dino.backend.features.productcatalog.application.model.ProductLean;
import com.dino.backend.features.productcatalog.application.model.SkuLean;
import com.dino.backend.features.pricing.application.model.SkuPrice;

public record CartItemRes(
        Long id,
        int quantity,
        String photo,
        ProductLean product,
        SkuLean sku,
        SkuPrice price) {
}