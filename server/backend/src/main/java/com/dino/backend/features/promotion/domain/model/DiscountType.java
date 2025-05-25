package com.dino.backend.features.promotion.domain.model;

public enum DiscountType {
    PRODUCT, NEW_ARRIVAL, FLASH_SALE;

    public int getPriority() {
        return switch (this) {
            case FLASH_SALE -> 1;
            case NEW_ARRIVAL -> 2;
            case PRODUCT -> 3;
        };
    }
}
