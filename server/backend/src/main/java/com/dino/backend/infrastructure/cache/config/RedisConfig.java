package com.dino.backend.infrastructure.cache.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public ObjectMapper redisJsonMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        // attach type for non-final props, such as object, interface, generic, list, map,...
        // getPolymorphicTypeValidator avoid RCE vulnerability.
        objectMapper.activateDefaultTyping(
                objectMapper.getPolymorphicTypeValidator(), ObjectMapper.DefaultTyping.NON_FINAL);
        // can access private, protected props; bypass getter, setter
        objectMapper.setVisibility(
                PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // support datetime, such as Instant, LocalDatetime,...
        objectMapper.registerModule(new JavaTimeModule());
        // keep format of ISO-date string, not Epoch-time integer
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return objectMapper;
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory redisConnectionFactory,
            ObjectMapper redisJsonMapper
    ) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);

        var stringRedisSerializer = new StringRedisSerializer();
        var jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(redisJsonMapper, Object.class);

        template.setKeySerializer(stringRedisSerializer);
        template.setValueSerializer(jackson2JsonRedisSerializer);

        template.setHashKeySerializer(stringRedisSerializer);
        template.setHashValueSerializer(jackson2JsonRedisSerializer);

        template.afterPropertiesSet(); // check all sittings
        return template;
    }
}
