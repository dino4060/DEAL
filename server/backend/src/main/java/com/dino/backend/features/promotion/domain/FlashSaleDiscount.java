package com.dino.backend.features.promotion.domain;

import com.dino.backend.features.promotion.domain.model.DiscountChannelType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@DiscriminatorValue("FLASH_SALE")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE discount_promotions SET is_deleted = true WHERE promotion_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlashSaleDiscount extends Discount {

    @Enumerated(EnumType.STRING)
    @Column(name = "channel_type")
    DiscountChannelType channelType;

    // max 3 days
}
