package com.dino.backend.infrastructure.persistence;

import com.dino.backend.features.product.domain.model.ProductItemView;
import com.dino.backend.features.product.domain.query.IProductQuery;
import com.dino.backend.infrastructure.persistence.sqlquery.IProductSqlQuery;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductQueryImpl implements IProductQuery {

    IProductSqlQuery productSqlQuery;

    @Override
    public List<ProductItemView> searchByMultiParams(
            String keyword, List<Integer> categories, Integer[] priceRange
    ) {
        return this.productSqlQuery.searchFullText(keyword);
    }

    @Override
    public Page<ProductItemView> searchByMultiParams(
            String keyword, List<Integer> categories, Integer[] priceRange,
            @NonNull Pageable pageable
    ) {
        return null;
    }
}
