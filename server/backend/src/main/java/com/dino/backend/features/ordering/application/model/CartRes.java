package com.dino.backend.features.ordering.application.model;

import java.util.List;

public record CartRes(
        Long id,
        int total,
        List<CartGroupRes> cartGroups
) {
}