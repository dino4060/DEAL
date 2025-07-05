package com.dino.backend.features.inventory.application.provider;

public interface IInventoryLockProvider {

    void reserveStockWithLock(Long skuId, Runnable doReserveStock);
}
