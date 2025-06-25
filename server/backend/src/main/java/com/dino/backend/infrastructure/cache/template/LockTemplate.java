package com.dino.backend.infrastructure.cache.template;

import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Collections;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public abstract class LockTemplate {

    RedisTemplate<String, String> redisTemplate;

    private String getLock(String key) {
        return this.redisTemplate.opsForValue().get(key);
    }

    private Boolean createLock(String key) {
        var value = "success";
        var ttl = Duration.ofSeconds(10);

        return redisTemplate.opsForValue().setIfAbsent(key, value, ttl);
    }

    private void sleep(Duration timeout) {
        try {
            Thread.sleep(timeout);
        } catch (InterruptedException e) {
            throw new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION);
        }
    }

    protected boolean tryLock(String key) {
        var retryTimes = Collections.nCopies(10, 1);
        var sleepTime = Duration.ofMillis(50);

        for (var ignore : retryTimes) {
            Boolean lockAcquired = this.createLock(key);

            if (Boolean.TRUE.equals(lockAcquired)) {
                log.info("Lock acquired: {} : {}", key, this.getLock(key));
                return true;
            }
            this.sleep(sleepTime);
        }
        return false;
    }

    protected void releaseLock(String key) {
        this.redisTemplate.delete(key);
        log.info("Lock released: {} : {}", key, this.getLock(key));
    }

    protected abstract void doTask();

    @Transactional
    public void executeWithLock(String key) {
        // 1. tryLock
        boolean lockAcquired = tryLock(key);

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
