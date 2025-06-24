package com.dino.backend.features.productcatalog.application.model;

public record CategoryLeanRes(
        Long id,
        String name,
        String slug,
        String photo
) {
}
