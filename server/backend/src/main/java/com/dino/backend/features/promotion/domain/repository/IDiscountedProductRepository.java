package com.dino.backend.features.promotion.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

import com.dino.backend.features.promotion.domain.DiscountedProduct;

public interface IDiscountedProductRepository
        extends JpaRepository<DiscountedProduct, String>, JpaSpecificationExecutor<DiscountedProduct> {

    List<DiscountedProduct> findByProductId(@NonNull String productId);

}
