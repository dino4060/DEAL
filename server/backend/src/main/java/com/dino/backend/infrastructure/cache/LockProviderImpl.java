package com.dino.backend.infrastructure.cache;

import com.dino.backend.features.inventory.application.provider.IInventoryLockProvider;
import com.dino.backend.infrastructure.cache.pattern.LockFacade;
import com.dino.backend.infrastructure.cache.pattern.LockTemplate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class LockProviderImpl implements IInventoryLockProvider {

    LockFacade lockFacade;

    @Override
    @Transactional
    public void reserveStockWithLock(Long skuId, Runnable doReserveStock) {
        var key = "inventory:sku:" + skuId;

        var locker = new LockTemplate(this.lockFacade) {
            @Override
            protected void doTask() {
                doReserveStock.run();
            }
        };

        locker.doTaskWithLock(key);
    }
}
