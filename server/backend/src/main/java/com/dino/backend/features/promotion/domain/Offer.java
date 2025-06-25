package com.dino.backend.features.promotion.domain;

import com.dino.backend.features.promotion.domain.repository.Promotion;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Offer extends Promotion {
}