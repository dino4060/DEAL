package com.dino.backend.features.ordering.application.model;

import com.dino.backend.features.ordering.domain.model.*;
import com.dino.backend.features.profile.application.model.ShopLeanRes;

import java.util.List;

public record DraftOrderRes(
        Long id,
        OrderStatus status,
        ShopLeanRes shop,
        String note,
        CheckoutSnapshot checkoutSnapshot,
        ShippingDetail shippingDetail,
        List<OrderItemRes> orderItems) {
}
