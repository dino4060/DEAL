package com.dino.backend.infrastructure.web.model;

import java.util.Set;

public record CurrentUser(String id, Set<String> roles) {
}