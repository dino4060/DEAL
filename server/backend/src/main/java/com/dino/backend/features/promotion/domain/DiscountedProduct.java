package com.dino.backend.features.promotion.domain;

import com.dino.backend.features.productcatalog.domain.Product;
import com.dino.backend.features.promotion.domain.model.PriceType;
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

import java.util.List;

@Entity
@Table(name = "discounted_products")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE discounted_products SET is_deleted = true WHERE discounted_product_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountedProduct extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "discounted_product_id", updatable = false, nullable = false)
    String id;

    Integer discountPercent;

    Integer dealPrice;

    Integer minDealPrice;

    Integer maxDealPrice;

    Integer totalLimit;

    Integer buyerLimit;

    @Enumerated(EnumType.STRING)
    @Column(name = "price_type", nullable = false)
    PriceType priceType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", updatable = false, nullable = false)
    @JsonIgnore
    Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discount_id", updatable = false, nullable = false)
    @JsonIgnore
    Discount discount;

    @OneToMany(mappedBy = "discountedProduct", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<DiscountedSku> discountedSkus;
}
