package com.dino.backend.features.pricing.application.provider;

import com.dino.backend.features.pricing.domain.ProductPrice;

public interface IRealtimePriceProvider {

    void publishPriceUpdate(Long productId, ProductPrice productPrice);
}
