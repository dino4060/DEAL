package com.dino.backend.features.product.application.model;

import java.util.List;

public record ProductSearchParams(
        String keyword,
        List<Integer> categories,
        Integer[] priceRange
) {
}
