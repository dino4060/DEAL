package com.dino.backend.features.identity.application.model;

public record LookupEmailRes(
        Boolean isEmailProvided,
        Boolean isPasswordProvided
) {
}
