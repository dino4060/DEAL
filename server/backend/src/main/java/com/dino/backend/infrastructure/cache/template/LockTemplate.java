package com.dino.backend.infrastructure.cache.template;

import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Collections;

@Component
@RequiredArgsConstructor
@Slf4j
public abstract class LockTemplate {

    protected abstract boolean tryLock(String key, String value, Duration ttl, int maxRetry, Duration timeout);

    protected abstract void doTask();

    protected abstract void releaseLock(String key);

    @Transactional
    public void executeWithLock(String key, String value, Duration ttl, int maxRetry, Duration timeout) {
        // 1. tryLock
        boolean lockAcquired = tryLock(key, value, ttl, maxRetry, timeout);

        if (!lockAcquired)
            throw new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION);
        // 2. doTask
        try {
            this.doTask();
        } catch (Exception e) {
            throw new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION);
        }
        // 3. releaseLock
        finally {
            this.releaseLock(key);
        }
    }
}
