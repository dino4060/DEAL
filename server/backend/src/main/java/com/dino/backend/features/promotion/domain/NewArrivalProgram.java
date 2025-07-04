package com.dino.backend.features.promotion.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@DiscriminatorValue("NEW_ARRIVAL")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE discount_programs SET is_deleted = true WHERE discount_program_id=?")
@SQLRestriction("is_deleted = false")
@SuperBuilder
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewArrivalProgram extends ProductDiscountProgram {
    // max 3 months
    // buyerLimit 1
    // no discounted sku price

    @Override
    public int getPriority() {
        return 3;
    }

}