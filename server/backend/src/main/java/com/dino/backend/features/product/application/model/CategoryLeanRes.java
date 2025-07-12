package com.dino.backend.features.product.application.model;

public record CategoryLeanRes(
        Long id,
        String name,
        String slug,
        String photo
) {
}
