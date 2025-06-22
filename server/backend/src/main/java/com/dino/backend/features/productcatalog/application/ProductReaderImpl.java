package com.dino.backend.features.productcatalog.application;

import com.dino.backend.features.productcatalog.application.mapper.IProductMapper;
import com.dino.backend.features.productcatalog.application.model.ProductItemRes;
import com.dino.backend.features.productcatalog.application.model.ProductSearchParams;
import com.dino.backend.features.productcatalog.application.reader.IProductReader;
import com.dino.backend.features.productcatalog.domain.Product;
import com.dino.backend.features.productcatalog.domain.model.ProductItemView;
import com.dino.backend.features.productcatalog.domain.query.IProductQuery;
import com.dino.backend.features.pricing.application.service.IDiscountService;
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

    IProductQuery productQuery;
    IProductMapper productMapper;
    IDiscountService discountService;

    @Override
    public PageRes<ProductItemRes> searchProduct(ProductSearchParams searchParams, Pageable pageable) {
        var pageDomain = this.productQuery.searchByMultiParams(
                searchParams.keyword(), searchParams.categories(), searchParams.priceRange(), pageable);

        var productList = pageDomain.getContent().stream()
                .map(p -> {
                    var product = this.productMapper.toProductItemRes(p);
                    var discount = this.discountService.canDiscount(Product.builder().id(p.getId()).build());
                    discount.ifPresent(d -> {
                        product.setDealPrice(
                                d.getDealPrice() != null ? d.getDealPrice() : 0); // TODO: legacy code is d.getMinDealPrice()
                        product.setDiscountPercent(
                                d.getDiscountPercent() != null ? d.getDiscountPercent() : 0); // TODO: legacy code is d.getMinDiscountPercent()
                    });
                    return product;
                })
                .toList();

        return PageRes.from(pageDomain, productList);
    }

    @Override
    public List<ProductItemView> searchProduct(ProductSearchParams searchParams) {
        return this.productQuery.searchByMultiParams(
                searchParams.keyword(), searchParams.categories(), searchParams.priceRange());
    }
}
