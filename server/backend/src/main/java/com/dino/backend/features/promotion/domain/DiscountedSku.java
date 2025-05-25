package com.dino.backend.features.promotion.domain;

import com.dino.backend.features.productcatalog.domain.Sku;
import com.dino.backend.shared.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "discounted_skus")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE discounted_skus SET is_deleted = true WHERE discounted_sku_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountedSku extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "discounted_sku_id", updatable = false, nullable = false)
    String id;

    Integer discountPercent;

    Integer dealPrice;

    Integer totalLimit;

    Integer buyerLimit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discounted_product_id", updatable = false, nullable = false)
    @JsonIgnore
    DiscountedProduct discountedProduct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", updatable = false, nullable = false)
    @JsonIgnore
    Sku sku;
}
