package com.dino.backend.features.productcatalog.application;

import java.util.Optional;

import com.dino.backend.features.productcatalog.domain.Sku;

public interface ISkuService {
    // DOMAIN //

    Sku getSku(Long skuId);

    Optional<Sku> findSku(Long skuId);

    String getPhoto(Sku sku);
}
