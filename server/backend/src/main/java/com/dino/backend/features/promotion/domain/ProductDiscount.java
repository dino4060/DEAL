package com.dino.backend.features.promotion.domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.dino.backend.features.promotion.domain.model.DiscountPricingType;

@Entity
@DiscriminatorValue("PRODUCT")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE discount_promotions SET is_deleted = true WHERE promotion_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDiscount extends Discount {

    @Enumerated(EnumType.STRING)
    @Column(name = "pricing_type")
    DiscountPricingType pricingType;

    // max 1 year
}