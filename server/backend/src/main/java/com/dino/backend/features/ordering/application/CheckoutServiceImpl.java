package com.dino.backend.features.ordering.application;

import com.dino.backend.features.inventory.application.service.IInventoryService;
import com.dino.backend.features.ordering.application.mapper.ICheckoutMapper;
import com.dino.backend.features.ordering.application.mapper.IOrderMapper;
import com.dino.backend.features.ordering.application.model.*;
import com.dino.backend.features.ordering.application.service.ICartService;
import com.dino.backend.features.ordering.application.service.ICheckoutService;
import com.dino.backend.features.ordering.application.service.IOrderService;
import com.dino.backend.features.ordering.domain.Cart;
import com.dino.backend.features.ordering.domain.CartItem;
import com.dino.backend.features.ordering.domain.Order;
import com.dino.backend.features.ordering.domain.OrderItem;
import com.dino.backend.features.ordering.domain.model.CheckoutSnapshot;
import com.dino.backend.features.pricing.application.service.IPricingService;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.application.utils.Deleted;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CheckoutServiceImpl implements ICheckoutService {

    IPricingService pricingService;

    IInventoryService inventoryService;

    ICartService cartService;

    IOrderService orderService;

    ICheckoutMapper checkoutMapper;

    IOrderMapper orderMapper;

    // QUERY //

    /**
     * estimateCheckout
     */
    @Override
    public EstimateCheckoutRes estimateCheckout(EstimateCheckoutReq request, CurrentUser currentUser) {
        // 1. get Cart & group CartItems
        Cart cart = cartService.getCartWithShop(currentUser);

        var itemsGroupedByShop = this.cartService.groupCartItemByShop(cart, request.cartItemIds())
                .orElseThrow(() -> new AppException(ErrorCode.CART__ITEM_NOT_FOUND));

        // 2. checkout each group, then total checkout
        var totalCheckoutSnapshot = CheckoutSnapshot.createEmpty();

        for (var entry : itemsGroupedByShop.entrySet()) {
            List<CartItem> cartItems = entry.getValue();

            var checkoutSnapshot = this.pricingService.checkoutCartGroup(cartItems);

            totalCheckoutSnapshot.accumulateFrom(checkoutSnapshot);
        }
        return checkoutMapper.toEstimateCheckoutRes(cart.getId(), totalCheckoutSnapshot);
    }

    // COMMAND //

    /**
     * startCheckout
     */
    @Override
    @Transactional
    public StartCheckoutRes startCheckout(StartCheckoutReq request, CurrentUser currentUser) {
        // 1. get Cart, group CartItems by Shop
        Cart cart = this.cartService.getCartWithShop(currentUser);

        var itemsGroupedByShop = this.cartService.groupCartItemByShop(cart, request.cartItemIds())
                .orElseThrow(() -> new AppException(ErrorCode.CART__ITEM_NOT_FOUND));

        // 2. create draft Orders
        var ordersRes = new ArrayList<DraftOrderRes>();
        var totalCheckoutSnapshot = CheckoutSnapshot.createEmpty();

        for (var entry : itemsGroupedByShop.entrySet()) {
            var shop = entry.getKey();
            var cartItems = entry.getValue();

            var createdOrder = this.orderService.createDraftOrder(cartItems, shop, currentUser);

            ordersRes.add(this.orderMapper.toDraftOrderRes(createdOrder));
            totalCheckoutSnapshot.accumulateFrom(createdOrder.getCheckoutSnapshot());
        }
        return this.checkoutMapper.toStartCheckoutRes(
                ordersRes.getFirst().id(), totalCheckoutSnapshot, ordersRes);
    }

    /**
     * confirmCheckout
     */
    @Override
    @Transactional
    public ConfirmCheckoutRes confirmCheckout(ConfirmCheckoutReq request, CurrentUser currentUser) {
        // 1. get orders of current user
        var ordersToConfirm = this.orderService.getOrdersByIds(request.orderIds(), currentUser);

        // 2. update order and inventory
        var updatedOrders = new ArrayList<>();

        for (Order order : ordersToConfirm) {
            for (OrderItem orderItem : order.getOrderItems())
                inventoryService.reserveStock(orderItem.getSku().getId(), orderItem.getQuantity());

            Order updatedOrder = this.orderService.markAsPending(order);
            updatedOrders.add(updatedOrder);
        }

        // 3. remove cart items
        var skuIds = new ArrayList<Long>();

        for (Order order : ordersToConfirm) {
            for (OrderItem orderItem : order.getOrderItems())
                skuIds.add(orderItem.getSku().getId());
        }
        this.cartService.removeCartItems(skuIds, currentUser);

        return ConfirmCheckoutRes.success(updatedOrders.size());
    }

    /**
     * cancelCheckout
     */
    @Override
    public Deleted cancelCheckout(Duration orderTtl) {
        return orderService.cleanupDraftOrders(orderTtl);
    }
}