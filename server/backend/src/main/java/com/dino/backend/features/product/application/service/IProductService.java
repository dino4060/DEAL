package com.dino.backend.features.product.application.service;

import com.dino.backend.shared.application.utils.Id;
import org.springframework.data.domain.Pageable;

import com.dino.backend.features.product.application.model.ProductItemRes;
import com.dino.backend.features.product.application.model.ProductRes;
import com.dino.backend.shared.application.utils.PageRes;

public interface IProductService {
    // QUERY //

    PageRes<ProductItemRes> listProducts(Pageable pageable);

    ProductRes getProduct(Id productId);
}
