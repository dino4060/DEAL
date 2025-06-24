package com.dino.backend.features.productcatalog.application.service;

import com.dino.backend.shared.application.utils.Id;
import org.springframework.data.domain.Pageable;

import com.dino.backend.features.productcatalog.application.model.ProductItemRes;
import com.dino.backend.features.productcatalog.application.model.ProductRes;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.application.utils.PageRes;

public interface IProductService {
    // QUERY //

    PageRes<ProductItemRes> listProduct(Pageable pageable);

    ProductRes getProduct(Id productId);
}
