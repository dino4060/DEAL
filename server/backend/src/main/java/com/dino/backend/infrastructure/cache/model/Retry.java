package com.dino.backend.infrastructure.cache.model;

import java.time.Duration;

public record Retry(
        int max,
        Duration timeout
) {
    public static Retry of() {
        var maxRetry = 10;
        var timeout = Duration.ofMillis(50);
        return new Retry(maxRetry, timeout);
    }
}
