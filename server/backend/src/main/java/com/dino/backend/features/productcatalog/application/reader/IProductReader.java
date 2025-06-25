package com.dino.backend.features.productcatalog.application.reader;

import com.dino.backend.features.productcatalog.application.model.ProductItemRes;
import com.dino.backend.features.productcatalog.application.model.ProductSearchParams;
import com.dino.backend.shared.application.utils.PageRes;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductReader {

    List<ProductItemRes> searchProducts(ProductSearchParams searchParams);

    PageRes<ProductItemRes> searchProducts(ProductSearchParams searchParams, Pageable pageable);
}
