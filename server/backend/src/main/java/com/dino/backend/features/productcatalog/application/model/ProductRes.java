package com.dino.backend.features.productcatalog.application.model;

import java.util.List;

import com.dino.backend.features.pricing.domain.ProductDiscount;
import com.dino.backend.features.productcatalog.domain.Category;
import com.dino.backend.features.productcatalog.domain.Sku;
import com.dino.backend.features.productcatalog.domain.model.ProductMeta;
import com.dino.backend.features.productcatalog.domain.model.ProductSpecification;
import com.dino.backend.features.productcatalog.domain.model.ProductTierVariation;
import com.dino.backend.features.shop.domain.Shop;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRes {

    Long id;
    String status;
    String name;
    String slug;
    String thumb;
    List<String> photos;
    String sizeGuidePhoto;
    String video;
    Integer retailPrice;
    Integer minRetailPrice;
    Integer maxRetailPrice;
    String description;

    List<ProductSpecification> specifications;
    List<ProductTierVariation> tierVariations;
    ProductMeta meta;

    List<Sku> skus;

    ProductDiscount discount;
    Category category;
    Shop shop;
}
