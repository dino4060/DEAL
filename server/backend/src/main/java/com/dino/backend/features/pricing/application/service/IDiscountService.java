package com.dino.backend.features.pricing.application.service;

import com.dino.backend.features.pricing.domain.ProductDiscount;
import com.dino.backend.features.productcatalog.domain.Product;
import com.dino.backend.features.productcatalog.domain.Sku;
import com.dino.backend.shared.api.model.CurrentUser;

import java.util.Optional;

public interface IDiscountService {
    // QUERY //

    Optional<ProductDiscount> canDiscount(Product product);

    Optional<ProductDiscount> canDiscount(Product product, CurrentUser currentUser);

    Optional<ProductDiscount> canDiscount(Sku sku, CurrentUser currentUser);
}
