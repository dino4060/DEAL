package com.dino.backend.features.product.application.service;

import java.util.Optional;

import com.dino.backend.features.product.domain.Sku;

public interface ISkuService {
    // DOMAIN //

    Sku getSku(Long skuId);

    Optional<Sku> findSku(Long skuId);

    String getPhoto(Sku sku);
}
