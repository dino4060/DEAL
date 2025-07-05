package com.dino.backend.features.ordering.application.model;

import com.dino.backend.features.ordering.domain.model.*;
import com.dino.backend.features.profile.application.model.ShopLeanRes;

import java.util.List;

public record OrderRes(
        Long id,
        OrderStatus status,
        OrderTimeline timeline,
        CheckoutSnapshot checkoutSnapshot,
        PaymentMethod paymentMethod,
        ShopLeanRes shop,
        String note,
        List<OrderItemRes> orderItems,
        ShippingDetail shippingDetail,
        OrderAddress pickupAddress,
        OrderAddress deliveryAddress) {
}
