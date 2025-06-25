package com.dino.backend.features.productcatalog.domain.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductPriceView {
    Long id;
    int mainPrice;
    Integer sidePrice;
    int discountPercent;

    Integer maxMainPrice;
    Integer maxSidePrice;
    Integer maxDiscountPercent;
}
