package com.dino.backend.features.product.application;

import com.dino.backend.features.product.application.mapper.IProductMapper;
import com.dino.backend.features.product.application.model.ProductWithPriceRes;
import com.dino.backend.features.product.application.model.ProductSearchParams;
import com.dino.backend.features.product.application.reader.IProductReader;
import com.dino.backend.features.product.application.service.IProductService;
import com.dino.backend.features.product.domain.query.IProductQuery;
import com.dino.backend.shared.application.utils.AppUtils;
import com.dino.backend.shared.application.utils.PageRes;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductReaderImpl implements IProductReader {

    IProductService productService;
    IProductQuery productQuery;
    IProductMapper productMapper;

    @Override
    public List<ProductWithPriceRes> searchProducts(ProductSearchParams searchParams) {
        if (AppUtils.isBlank(searchParams.keyword()))
            return this.productService.listProducts(AppUtils.defaultPageable()).getItems();

        var products = this.productQuery.searchByMultiParams(
                searchParams.keyword(), searchParams.categories(), searchParams.priceRange());

        return products.stream()
                .map(p -> this.productMapper.toProductItemRes(p))
                .toList();
    }

    @Override
    public PageRes<ProductWithPriceRes> searchProducts(ProductSearchParams searchParams, Pageable pageable) {
        var pageDomain = this.productQuery.searchByMultiParams(
                searchParams.keyword(), searchParams.categories(), searchParams.priceRange(), pageable);

        var productList = pageDomain.getContent().stream()
                .map(p -> this.productMapper.toProductItemRes(p))
                .toList();

        return PageRes.from(pageDomain, productList);
    }
}
