package com.dino.backend.features.pricing.application.service;

import com.dino.backend.features.ordering.domain.CartItem;
import com.dino.backend.features.ordering.domain.OrderItem;
import com.dino.backend.features.ordering.domain.model.CheckoutSnapshot;
import com.dino.backend.features.pricing.application.model.SkuPriceRes;
import com.dino.backend.features.promotion.domain.ProductDiscount;
import com.dino.backend.features.productcatalog.domain.Sku;
import com.dino.backend.shared.api.model.CurrentUser;

import java.util.List;

public interface IPricingService {

    SkuPriceRes calculateRetail(Sku sku);

    SkuPriceRes calculateDiscount(Sku sku, ProductDiscount discount);

    SkuPriceRes calculatePrice(Sku sku, CurrentUser currentUser);

    CheckoutSnapshot checkoutOrder(List<OrderItem> orderItems);

    CheckoutSnapshot checkoutCartGroup(List<CartItem> cartItems, CurrentUser currentUser);
}
