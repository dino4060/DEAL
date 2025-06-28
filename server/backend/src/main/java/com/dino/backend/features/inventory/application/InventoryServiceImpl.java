package com.dino.backend.features.inventory.application;

import com.dino.backend.features.inventory.application.service.IInventoryService;
import com.dino.backend.features.inventory.domain.Inventory;
import com.dino.backend.features.inventory.domain.repository.IInventoryRepository;
import com.dino.backend.infrastructure.cache.LockTemplate;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class InventoryServiceImpl implements IInventoryService {

    IInventoryRepository inventoryRepository;

    RedisTemplate<String, String> redisTemplate;

    /**
     * checkStock
     */
    @Override
    @Transactional(readOnly = true)
    public Inventory checkStock(Long skuId, int quantity) {
        Inventory inventory = inventoryRepository.findBySkuId(skuId)
                .orElseThrow(() -> new AppException(ErrorCode.INVENTORY__NOT_FOUND));

        if (inventory.getStocks() < quantity)
            throw new AppException(ErrorCode.SKU__INSUFFICIENT_STOCK);

        return inventory;
    }

    /**
     * reserveStock
     */
    @Override
    @Transactional
    public void reserveStock(Long skuId, int quantity) {
        Inventory inventory = this.checkStock(skuId, quantity);
        inventory.reverseStock(quantity);
        inventoryRepository.save(inventory);
    }

//    private void sleep(Duration timeout) {
//        try {
//            Thread.sleep(timeout);
//        } catch (InterruptedException e) {
//            throw new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION);
//        }
//    }
//
//    private boolean tryLock(String key, String value, Duration ttl, int maxRetry, Duration timeout) {
//        var retryTimes = Collections.nCopies(maxRetry, 1);
//
//        for (var ignore : retryTimes) {
//            Boolean lockAcquired = redisTemplate.opsForValue().setIfAbsent(key, value, ttl);
//
//            if (Boolean.TRUE.equals(lockAcquired)) {
//                log.info("Lock acquired: {} : {}", key, this.redisTemplate.opsForValue().get(key));
//                return true;
//            }
//            sleep(timeout);
//        }
//        return false;
//    }
//
//    private void releaseLock(String key) {
//        this.redisTemplate.delete(key);
//        log.info("Lock released: {} : {}", key, this.redisTemplate.opsForValue().get(key));
//    }
//
//    @Override
//    public void reserveStockWithLock(Long skuId, int quantity) {
//        var key = "inventory:sku:" + skuId;
//        var value = "success";
//        var ttl = Duration.ofSeconds(10);
//        var timeout = Duration.ofMillis(50);
//        var maxRetry = 10;
//
//        boolean lockAcquired = tryLock(key, value, ttl, maxRetry, timeout);
//
//        if (!lockAcquired)
//            throw new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION);
//
//        try {
//            this.reserveStock(skuId, quantity);
//        } catch (Exception e) {
//            throw new AppException(ErrorCode.SYSTEM__UNHANDLED_EXCEPTION);
//        } finally {
//            this.releaseLock(key);
//        }
//    }

    @Override
    public void reserveStockWithLock(Long skuId, int quantity) {
        var key = "inventory:sku:" + skuId;
        var value = "success";
        var ttl = Duration.ofSeconds(10);
        var timeout = Duration.ofMillis(50);
        var maxRetry = 10;

        new LockTemplate(redisTemplate) {
            @Override
            protected void doSomething() {
                reserveStock(skuId, quantity);
            }
        }.execute(key, value, ttl, maxRetry, timeout);
    }
}