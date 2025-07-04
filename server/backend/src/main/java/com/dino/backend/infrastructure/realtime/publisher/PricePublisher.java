package com.dino.backend.infrastructure.realtime.publisher;

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
public class PricePublisher {

    SimpMessagingTemplate messagingTemplate;

    public void publishPriceUpdate(Long productId, ProductPrice updatedPrice) {
        messagingTemplate.convertAndSend("/topic/price/" + productId, updatedPrice);
    }
}
