package com.dino.backend.features.product.domain.repository;

import com.dino.backend.features.product.domain.Sku;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface ISkuRepository extends JpaRepository<Sku, Long> {
    // FIND//
    Optional<Sku> findByCode(@NonNull String skuCode);
}
