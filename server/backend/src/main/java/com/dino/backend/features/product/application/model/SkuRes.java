package com.dino.backend.features.product.application.model;

import com.dino.backend.features.inventory.application.model.InventoryRes;
import com.dino.backend.features.product.domain.model.SkuStatus;

import java.util.List;

public record SkuRes(
        Long id,
        SkuStatus status,
        String code,
        List<Integer> tierOptionIndexes,
        String tierOptionValue,
        int retailPrice,
        Integer productionCost,

        InventoryRes inventory
) {
}
