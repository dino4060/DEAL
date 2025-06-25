package com.dino.backend.features.inventory.application;

public interface IInventoryLockProvider {

    void reserveStockWithLock(Long skuId, Runnable doReserveStock);
}
