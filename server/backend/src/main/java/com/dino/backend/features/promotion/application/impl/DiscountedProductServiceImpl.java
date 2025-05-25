package com.dino.backend.features.promotion.application.impl;

import java.util.Comparator;

import org.springframework.stereotype.Service;

import com.dino.backend.features.promotion.application.IDiscountedProductService;
import com.dino.backend.features.promotion.domain.Discount;
import com.dino.backend.features.promotion.domain.DiscountedProduct;
import com.dino.backend.features.promotion.domain.repository.IDiscountedProductRepository;
import com.dino.backend.infrastructure.aop.AppException;
import com.dino.backend.infrastructure.aop.ErrorCode;
import com.dino.backend.infrastructure.web.model.CurrentUser;
import com.dino.backend.shared.utils.Id;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DiscountedProductServiceImpl implements IDiscountedProductService {

    IDiscountedProductRepository discountedProductRepository;

    // QUERY //

    // getByProductId //
    @Override
    public DiscountedProduct getByProductId(String productId, CurrentUser currentUser) {
        Id.from(productId)
                .orElseThrow(() -> new AppException(ErrorCode.DISCOUNTED_PRODUCT__NOT_FOUND));

        var discountedProducts = this.discountedProductRepository.findByProductId(productId);

        if (discountedProducts.isEmpty())
            throw new AppException(ErrorCode.DISCOUNTED_PRODUCT__NOT_FOUND);

        if (discountedProducts.size() == 1)
            return discountedProducts.get(0);

        return discountedProducts.stream()
                .min(Comparator.comparingInt(dp -> Discount.getPriority(dp.getDiscount())))
                .orElseThrow(() -> new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION));
    }
}
