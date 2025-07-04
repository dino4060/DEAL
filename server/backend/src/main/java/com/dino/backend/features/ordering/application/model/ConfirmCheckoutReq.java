package com.dino.backend.features.ordering.application.model;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record ConfirmCheckoutReq(
        @NotEmpty(message = "ORDER__ORDERS_EMPTY")
        List<Long> orderIds) {
}
