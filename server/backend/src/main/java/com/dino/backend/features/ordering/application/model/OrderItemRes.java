package com.dino.backend.features.ordering.application.model;

import com.dino.backend.features.product.application.model.ProductLeanRes;
import com.dino.backend.features.product.application.model.SkuLeanRes;

public record OrderItemRes(
        Long id,
        String photo,
        int quantity,
        int mainPrice,
        Integer sidePrice,
        ProductLeanRes product,
        SkuLeanRes sku
) {
}
