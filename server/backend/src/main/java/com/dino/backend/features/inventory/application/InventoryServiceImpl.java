package com.dino.backend.features.inventory.application;

import com.dino.backend.features.inventory.application.service.IInventoryService;
import com.dino.backend.features.inventory.domain.Inventory;
import com.dino.backend.features.inventory.domain.repository.IInventoryRepository;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class InventoryServiceImpl implements IInventoryService {

    IInventoryRepository inventoryRepository;

    /**
     * checkStock:
     */
    @Override
    @Transactional(readOnly = true)
    public Inventory checkStock(Long skuId, int quantity) {
        Inventory inventory = inventoryRepository.findBySkuId(skuId)
                .orElseThrow(() -> new AppException(ErrorCode.INVENTORY__NOT_FOUND));

        if (inventory.getStocks() < quantity)
            throw new AppException(ErrorCode.SKU__INSUFFICIENT_STOCK);

        return inventory;
    }

    /**
     * reserveStock
     */
    @Override
    @Transactional
    public void reserveStock(Long skuId, int quantity) {
        Inventory inventory = this.checkStock(skuId, quantity);

        inventory.setStocks(inventory.getStocks() - quantity);
        // TEMP: inventoryRepository.save(inventory);
    }
}