package com.dino.backend.features.product.application.model;

import com.dino.backend.features.product.domain.model.ProductMeta;
import com.dino.backend.features.product.domain.model.ProductSpecification;
import com.dino.backend.features.product.domain.model.ProductTierVariation;

import java.util.List;

public record ProductOfShopRes(
        Long id,
        String status,
        String name,
        String slug,
        String thumb,
        List<String> photos,
        String sizeGuidePhoto,
        String video,
        int retailPrice,
        String description,
        List<ProductSpecification> specifications,
        List<ProductTierVariation> tierVariations,
        ProductMeta meta,

        List<SkuRes> skus,
        CategoryBranchRes categoryBranch
) {
}
