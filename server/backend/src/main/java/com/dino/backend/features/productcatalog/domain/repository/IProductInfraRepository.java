
package com.dino.backend.features.productcatalog.domain.repository;

import com.dino.backend.features.productcatalog.domain.Product;
import com.dino.backend.features.productcatalog.domain.model.ProductProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface IProductInfraRepository extends JpaRepository<Product, String>, JpaSpecificationExecutor<Product> {

    Page<ProductProjection> findAllProjectedBy(Pageable pageable);

    @EntityGraph(attributePaths = { "category", "skus", "skus.inventory", "shop" })
    Optional<Product> findEagerById(@NonNull String id);

}
