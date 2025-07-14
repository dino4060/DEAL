package com.dino.backend.features.product.application;

import com.dino.backend.features.product.application.mapper.IProductMapper;
import com.dino.backend.features.product.application.model.ProductOfShopRes;
import com.dino.backend.features.product.application.model.ProductWithPriceRes;
import com.dino.backend.features.product.application.model.ProductRes;
import com.dino.backend.features.product.application.service.IProductService;
import com.dino.backend.features.product.domain.Product;
import com.dino.backend.features.product.domain.repository.IProductRepository;
import com.dino.backend.features.profile.application.service.IShopService;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.application.utils.Id;
import com.dino.backend.shared.application.utils.PageRes;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

// NOTE: == vs equal()
// 1. == compares on stack
// if primitive types ==   -> value on stack   -> compare values
// if reference types ==   -> address on stack -> compare addresses
// 2. equal() compares on heap
// reference types equal() -> value on heap    -> compare values

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductServiceImpl implements IProductService {

    IProductRepository productRepository;

    IProductMapper productMapper;

    // HELPERS //
    private void checkOwnProduct(CurrentUser seller, Product product) {
        if (seller.id().equals(product.getShop().getId()))
            throw new AppException(ErrorCode.SECURITY__UNAUTHORIZED);
    }

    // QUERY //

    // list //
    @Override
    public PageRes<ProductWithPriceRes> listProducts(Pageable pageable) {
        var page = this.productRepository.findAllProjectedBy(pageable);

        var products = page.getContent().stream()
                .map(this.productMapper::toProductItemRes)
                .toList();

        return PageRes.from(page, products);
    }


    // listProductsOfShop //
    @Override
    public PageRes<ProductOfShopRes> listProductsOfShop(Pageable pageable, CurrentUser currentUser) {
        var page = productRepository.findAllByShopSellerId(pageable, currentUser.id());

        var items = page.getContent().stream()
                .map(this.productMapper::toProductOfShopRes)
                .toList();

        return PageRes.from(page, items);
    }

    // getProduct //
    @Override
    public ProductRes getProduct(Id id) {
        var product = this.productRepository.findWithSkusAndShopById(id.value())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT__NOT_FOUND));

        return this.productMapper.toProductRes(product);
    }

    // getProductOfShop //
    @Override
    public ProductOfShopRes getProductOfShop(@NonNull Long productId, @NonNull CurrentUser currentUser) {
        var product = this.productRepository.findWithSkusAndShopById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT__NOT_FOUND));

        this.checkOwnProduct(currentUser, product);

        return this.productMapper.toProductOfShopRes(product);
    }
}
