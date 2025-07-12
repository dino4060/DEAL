package com.dino.backend.features.product.application.reader;

import com.dino.backend.features.product.application.model.ProductWithPriceRes;
import com.dino.backend.features.product.application.model.ProductSearchParams;
import com.dino.backend.shared.application.utils.PageRes;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductReader {

    List<ProductWithPriceRes> searchProducts(ProductSearchParams searchParams);

    PageRes<ProductWithPriceRes> searchProducts(ProductSearchParams searchParams, Pageable pageable);
}
