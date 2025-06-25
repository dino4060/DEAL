package com.dino.backend.features.ordering.application.model;

import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

public record EstimateCheckoutReq(

        @NotEmpty(message = "CART__ITEMS_EMPTY")
        Set<Long> cartItemIds
) {
}
