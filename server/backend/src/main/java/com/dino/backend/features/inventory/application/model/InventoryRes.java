package com.dino.backend.features.inventory.application.model;

public record InventoryRes(
        Long id,
        int stocks,
        int sales,
        int total
) {
}
