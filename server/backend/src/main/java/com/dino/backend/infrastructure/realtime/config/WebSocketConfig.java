package com.dino.backend.infrastructure.realtime.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Prefix cho client subscribe (server gửi tin)
        config.enableSimpleBroker("/topic");

        // Prefix cho client gửi tin (client gửi lên)
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoint kết nối WebSocket (Next.js sẽ kết nối vào đây)
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }
}
