package com.dino.backend.features.productcatalog.application.model;

import com.dino.backend.features.pricing.application.model.ProductPriceRes;
import com.dino.backend.features.productcatalog.domain.model.ProductMeta;
import com.dino.backend.features.productcatalog.domain.model.ProductSpecification;
import com.dino.backend.features.productcatalog.domain.model.ProductTierVariation;
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
        String description,
        List<ProductSpecification> specifications,
        List<ProductTierVariation> tierVariations,
        ProductMeta meta,

        List<SkuRes> skus,
        ProductPriceRes price,
        ShopLeanRes shop,
        CategoryBranchRes categoryBranch
) {}