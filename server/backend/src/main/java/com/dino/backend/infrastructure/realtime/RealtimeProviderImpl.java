package com.dino.backend.infrastructure.realtime;

import com.dino.backend.features.pricing.application.provider.IRealtimePriceProvider;
import com.dino.backend.features.pricing.domain.ProductPrice;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RealtimeProviderImpl implements IRealtimePriceProvider {

    SimpMessagingTemplate messagingTemplate;

    @Override
    public void publishPriceUpdate(Long productId, ProductPrice updatedPrice) {
        // Publish to queue at topic /topic/price/{productId}
        messagingTemplate.convertAndSend("/topic/price/" + productId, updatedPrice);
    }
}

