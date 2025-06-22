package com.dino.backend.features.promotion.domain;

import com.dino.backend.shared.domain.model.Promotion;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Offer extends Promotion {
}