package com.dino.backend.features.ordering.application.model;

import com.dino.backend.features.productcatalog.application.model.ProductLeanRes;
import com.dino.backend.features.productcatalog.application.model.SkuLeanRes;

public record OrderItemRes(
        Long id,
        String photo,
        int quantity,
        int mainPrice,
        int sidePrice,
        ProductLeanRes product,
        SkuLeanRes sku) {
}
