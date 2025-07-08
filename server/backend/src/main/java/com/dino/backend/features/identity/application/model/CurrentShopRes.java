package com.dino.backend.features.identity.application.model;

public record CurrentShopRes(
        String code,
        String name,
        String photo,
        String status,
        String contactEmail,
        String contactPhone,
        String businessType
) {
}
