package com.dino.backend.features.pricing.application;

import com.dino.backend.features.ordering.domain.CartItem;
import com.dino.backend.features.ordering.domain.OrderItem;
import com.dino.backend.features.ordering.domain.model.CheckoutSnapshot;
import com.dino.backend.features.pricing.domain.ProductDiscount;
import com.dino.backend.features.productcatalog.domain.Sku;
import com.dino.backend.features.pricing.application.model.SkuPrice;
import com.dino.backend.features.pricing.application.service.IDiscountService;
import com.dino.backend.features.pricing.application.service.IPricingService;
import com.dino.backend.features.pricing.domain.SkuDiscount;
import com.dino.backend.shared.api.model.CurrentUser;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PricingServiceImpl implements IPricingService {

    IDiscountService discountService;

    // QUERY //

    // SKU PRICE //

    @Override
    public SkuPrice calculateRetail(Sku sku) {
        // TODO: main price is sku.getRetailPrice()
        return new SkuPrice(0, 0, 0);
    }

    // calculatePrice Sku //
    @Override
    public SkuPrice calculateDiscount(Sku sku, ProductDiscount discount) {
        // TODO: main price is sku.getRetailPrice()
        Integer retailPrice = 0;
        // dealPrice = dealPrice | calculateDealPrice by discountPercent | null
        Integer dealPrice = discount.getDealPrice() != null
                ? discount.getDealPrice()
                : SkuDiscount.createDealPrice(0, discount.getDiscountPercent());  // TODO: main price is sku.getRetailPrice()
        // discountPercent = discountPercent | calculateDiscountPercent by dealPrice | null
        Integer discountPercent = discount.getDiscountPercent() != null
                // Discount ko có discountPercent => có dealPrice
                ? discount.getDiscountPercent()
                : SkuDiscount.createDiscountPercent(0, discount.getDealPrice()); // sku.getRetailPrice()

        return new SkuPrice(dealPrice, retailPrice, discountPercent);
    }

    @Override
    public SkuPrice calculatePrice(Sku sku, CurrentUser currentUser) {
        return this.discountService.canDiscount(sku, currentUser)
                .map(discount -> this.calculateDiscount(sku, discount))
                .orElseGet(() -> calculateRetail(sku));
    }

    // CHECKOUT //

    @Override
    public CheckoutSnapshot checkoutOrder(List<OrderItem> orderItems) {
        int totalMainPrice = orderItems.stream()
                .mapToInt(item -> item.getMainPrice() * item.getQuantity())
                .sum();

        return CheckoutSnapshot.createSnapshot(totalMainPrice);
    }

    @Override
    public CheckoutSnapshot checkoutCartGroup(List<CartItem> cartItems, CurrentUser currentUser) {
        int totalMainPrice = cartItems.stream()
                .mapToInt(item -> {
                    var skuPrice = this.calculatePrice(item.getSku(), currentUser);
                    return skuPrice.mainPrice() * item.getQuantity();
                })
                .sum();

        return CheckoutSnapshot.createSnapshot(totalMainPrice);
    }
}
