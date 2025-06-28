package com.dino.backend.infrastructure.model;

import java.time.Duration;

public record LockInfo(
        String key,
        String value,
        Duration ttl,
        int maxRetry,
        Duration timeout
) {
}
