package com.dino.backend.features.productcatalog.application;

import com.dino.backend.features.productcatalog.application.service.IProductService;
import com.dino.backend.features.productcatalog.application.mapper.IProductMapper;
import com.dino.backend.features.productcatalog.application.model.ProductItemRes;
import com.dino.backend.features.productcatalog.application.model.ProductRes;
import com.dino.backend.features.productcatalog.domain.Product;
import com.dino.backend.features.productcatalog.domain.repository.IProductRepository;
import com.dino.backend.features.pricing.application.service.IDiscountService;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.application.utils.Id;
import com.dino.backend.shared.application.utils.PageRes;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductServiceImpl implements IProductService {

    IDiscountService discountService;

    IProductRepository productRepository;

    IProductMapper productMapper;

    // QUERY //

    // list //
    @Override
    public PageRes<ProductItemRes> listProduct(Pageable pageable) {

        var page = this.productRepository.findAllProjectedBy(pageable);
        var products = page.getContent().stream()
                .map(p -> {
                    var product = this.productMapper.toProductItemRes(p);
                    var discount = this.discountService.canDiscount(Product.builder().id(p.getId()).build());
                    discount.ifPresent(d -> {
                        product.setDealPrice(
                                d.getDealPrice() != null ? d.getDealPrice() : 0); // TODO: legacy is d.getMinDealPrice()
                        product.setDiscountPercent(
                                d.getDiscountPercent() != null ? d.getDiscountPercent() : 0); // TODO: legacy is d.getMinDiscountPercent()
                    });
                    return product;
                })
                .toList();
        return PageRes.from(page, products);
    }

    // getById //
    @Override
    public ProductRes getProduct(String productId, CurrentUser currentUser) {
        Id id = Id.from(productId)
                .orElseThrow(() -> new AppException((ErrorCode.PRODUCT__NOT_FOUND)));

        var product = this.productRepository.findEagerById(id.value())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT__NOT_FOUND));

        var discount = this.discountService.canDiscount(product, currentUser);

        var res = this.productMapper.toProductRes(product);
        res.setDiscount(discount.orElse(null));
        return res;

    }
}
