package com.dino.backend.infrastructure.realtime;

import com.dino.backend.features.pricing.application.model.PriceUpdateMessage;
import com.dino.backend.features.pricing.application.provider.IRealtimePriceProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RealtimeProviderImpl implements IRealtimePriceProvider {

    private SimpMessagingTemplate messagingTemplate;

    @Override
    public void broadcastPriceUpdate(Long productId, Long skuId, Double newPrice) {
        PriceUpdateMessage msg = new PriceUpdateMessage(productId, skuId, newPrice);

        // Gửi đến tất cả client đang subscribe topic /topic/price
        messagingTemplate.convertAndSend("/topic/price", msg);
    }
}

