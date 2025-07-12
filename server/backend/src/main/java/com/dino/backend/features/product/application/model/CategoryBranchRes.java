package com.dino.backend.features.product.application.model;

public record CategoryBranchRes(
        Long id,
        CategoryLeanRes level1Category,
        CategoryLeanRes level2Category,
        CategoryLeanRes level3Category
) {
}
