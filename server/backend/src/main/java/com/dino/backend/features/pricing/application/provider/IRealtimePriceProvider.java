package com.dino.backend.features.pricing.application.provider;

public interface IRealtimePriceProvider {

    void broadcastPriceUpdate(Long productId, Long skuId, Double newPrice);
}
