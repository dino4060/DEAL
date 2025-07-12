package com.dino.backend.features.product.application.model;

import java.util.List;

public record SkuLeanRes(
        Long id,
        String code,
        List<Integer> tierOptionIndexes,
        String tierOptionValue
) {
}