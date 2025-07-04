package com.dino.backend.features.productcatalog.application.model;

import com.dino.backend.features.inventory.application.model.InventoryRes;
import com.dino.backend.features.pricing.application.model.SkuPriceRes;
import com.dino.backend.features.productcatalog.domain.model.SkuStatus;

import java.util.List;

public record SkuRes(
        Long id,
        SkuStatus status,
        String code,
        List<Integer> tierOptionIndexes,
        String tierOptionValue,
        Integer productionCost,

        InventoryRes inventory
) {

}
