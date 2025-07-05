package com.dino.backend.features.ordering.application.service;

import com.dino.backend.features.ordering.domain.CartItem;
import com.dino.backend.features.ordering.domain.Order;
import com.dino.backend.features.profile.domain.Shop;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.application.utils.Deleted;

import java.time.Duration;
import java.util.List;

public interface IOrderService {
    // QUERY //

    List<Order> getOrdersByIds(List<Long> orderIds, CurrentUser currentUser);

    // COMMAND //

    Order createDraftOrder(List<CartItem> cartItems, Shop shop, CurrentUser currentUser);

    Order markAsPending(Order order);

    Deleted cleanupDraftOrders(Duration orderTtl);
}