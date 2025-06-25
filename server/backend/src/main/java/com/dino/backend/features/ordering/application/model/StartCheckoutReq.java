package com.dino.backend.features.ordering.application.model;

import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

public record StartCheckoutReq(
        @NotEmpty(message = "CART__ITEMS_EMPTY")
        Set<Long> cartItemIds) {
}
