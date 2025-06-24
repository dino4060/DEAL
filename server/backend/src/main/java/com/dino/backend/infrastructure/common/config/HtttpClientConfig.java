package com.dino.backend.infrastructure.common.config;

import com.dino.backend.infrastructure.common.Const;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = Const.INFRASTRUCTURE_PACKAGE)
public class HtttpClientConfig {
}
