package com.dino.backend.features.promotion.domain;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("BASIC_DISCOUNT")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE discount_programs SET is_deleted = true WHERE discount_program_id=?")
@SQLRestriction("is_deleted = false")
@SuperBuilder
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BasicDiscountProgram extends DiscountProgram {
    // max 1 year

    @Override
    public int getPriority() {
        return 3;
    }
}