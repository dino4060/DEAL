package com.dino.backend.features.ordering.application.model;

import com.dino.backend.features.pricing.application.model.SkuPriceRes;
import com.dino.backend.features.productcatalog.application.model.ProductLeanRes;
import com.dino.backend.features.productcatalog.application.model.SkuLeanRes;

public record CartItemRes(
        Long id,
        int quantity,
        String photo,
        ProductLeanRes product,
        SkuLeanRes sku,
        SkuPriceRes price
) {
}