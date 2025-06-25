package com.dino.backend.features.inventory.application.service;

import com.dino.backend.features.inventory.domain.Inventory;

public interface IInventoryService {

    Inventory checkStock(Long skuId, int quantity);

    void reserveStock(Long skuId, int quantity);
}
