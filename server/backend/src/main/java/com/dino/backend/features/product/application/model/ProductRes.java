package com.dino.backend.features.product.application.model;

import com.dino.backend.features.pricing.application.model.ProductPriceRes;
import com.dino.backend.features.product.domain.model.ProductMeta;
import com.dino.backend.features.product.domain.model.ProductSpecification;
import com.dino.backend.features.product.domain.model.ProductTierVariation;
import com.dino.backend.features.profile.application.model.ShopLeanRes;

import java.util.List;

public record ProductRes(
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
        ProductPriceRes price,
        ShopLeanRes shop,
        CategoryBranchRes categoryBranch
) {}