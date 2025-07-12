package com.dino.backend.features.product.application.service;

import com.dino.backend.features.product.application.model.ProductOfShopRes;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.application.utils.Id;
import lombok.NonNull;
import org.springframework.data.domain.Pageable;

import com.dino.backend.features.product.application.model.ProductWithPriceRes;
import com.dino.backend.features.product.application.model.ProductRes;
import com.dino.backend.shared.application.utils.PageRes;

public interface IProductService {
    // QUERY //

    PageRes<ProductWithPriceRes> listProducts(Pageable pageable);

    PageRes<ProductOfShopRes> listProductsOfShop(Pageable pageable, CurrentUser currentUser);

    ProductRes getProduct(Id productId);

    ProductRes getProductOfShop(@NonNull Long productId, @NonNull CurrentUser currentUser);
}
