package com.dino.backend.infrastructure.cache;

import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Collections;

@Component
@RequiredArgsConstructor
@Slf4j
public abstract class LockTemplate {

    private final RedisTemplate<String, String> redisTemplate;

    protected abstract void doSomething(); // the template method

    private void sleep(Duration timeout) {
        try {
            Thread.sleep(timeout);
        } catch (InterruptedException e) {
            throw new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION);
        }
    }

    private boolean tryLock(String key, String value, Duration ttl, int maxRetry, Duration timeout) {
        var retryTimes = Collections.nCopies(maxRetry, 1);

        for (var ignore : retryTimes) {
            Boolean lockAcquired = redisTemplate.opsForValue().setIfAbsent(key, value, ttl);

            if (Boolean.TRUE.equals(lockAcquired)) {
                log.info("Lock acquired: {} : {}", key, this.redisTemplate.opsForValue().get(key));
                return true;
            }
            sleep(timeout);
        }
        return false;
    }

    private void releaseLock(String key) {
        this.redisTemplate.delete(key);
        log.info("Lock released: {} : {}", key, this.redisTemplate.opsForValue().get(key));
    }

    public void execute(String key, String value, Duration ttl, int maxRetry, Duration timeout) {
        boolean lockAcquired = tryLock(key, value, ttl, maxRetry, timeout);

        if (!lockAcquired)
            throw new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION);

        try {
            doSomething();
        } catch (Exception e) {
            throw new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION);
        } finally {
            this.releaseLock(key);
        }
    }
}
