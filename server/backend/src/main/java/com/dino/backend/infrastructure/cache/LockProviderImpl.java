package com.dino.backend.infrastructure.cache;

import com.dino.backend.features.inventory.application.IInventoryLockProvider;
import com.dino.backend.infrastructure.cache.template.LockTemplate;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class LockProviderImpl implements IInventoryLockProvider {

    RedisTemplate<String, String> redisTemplate;

    private void sleep(Duration timeout) {
        try {
            Thread.sleep(timeout);
        } catch (InterruptedException e) {
            throw new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION);
        }
    }

    private String getLock(String key) {
        return this.redisTemplate.opsForValue().get(key);
    }

    private Boolean createLock(String key, String value, Duration ttl) {
        return redisTemplate.opsForValue().setIfAbsent(key, value, ttl);
    }

    private boolean tryLock(String key, String value, Duration ttl, int maxRetry, Duration timeout) {
        var retryTimes = Collections.nCopies(maxRetry, 1);

        for (var ignore : retryTimes) {
            Boolean lockAcquired = this.createLock(key, value, ttl);

            if (Boolean.TRUE.equals(lockAcquired)) {
                log.info("Lock acquired: {} : {}", key, this.getLock(key));
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

    @Override
    public void reserveStockWithLock(Long skuId, Runnable doReserveStock) {
        var key = "inventory:sku:" + skuId;
        var value = "success";
        var ttl = Duration.ofSeconds(10);
        var timeout = Duration.ofMillis(50);
        var maxRetry = 10;

        new LockTemplate() {
            @Override
            protected boolean tryLock(String key, String value, Duration ttl, int maxRetry, Duration timeout) {
                return LockProviderImpl.this.tryLock(key, value, ttl, maxRetry, timeout);
            }

            @Override
            protected void doTask() {
                doReserveStock.run();
            }

            @Override
            protected void releaseLock(String key) {
                LockProviderImpl.this.releaseLock(key);
            }
        }.executeWithLock(key, value, ttl, maxRetry, timeout);
    }
}
