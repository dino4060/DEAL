package com.dino.backend.features.promotion.application;

import com.dino.backend.features.promotion.domain.DiscountedProduct;
import com.dino.backend.infrastructure.web.model.CurrentUser;

public interface IDiscountedProductService {
    // QUERY //

    DiscountedProduct getByProductId(String productId, CurrentUser currentUser);
}
