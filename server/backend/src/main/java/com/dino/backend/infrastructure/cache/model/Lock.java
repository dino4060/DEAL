package com.dino.backend.infrastructure.cache.model;

import java.time.Duration;

public record Lock(
        String key,
        String value,
        Duration ttl
) {
    public static Lock of(String key) {
        var value = "success";
        var ttl = Duration.ofSeconds(10);
        return new Lock(key,value, ttl);
    }
}
