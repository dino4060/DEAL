package com.dino.backend.features.ordering.application.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AddCartItemReq(
        @NotNull(message = "CART__SKU_EMPTY")
        Long skuId,

        @Min(value = 1, message = "CART__QUANTITY_MIN_INVALID")
        @Max(value = 100, message = "CART__QUANTITY_MAX_INVALID")
        int quantity) {
}