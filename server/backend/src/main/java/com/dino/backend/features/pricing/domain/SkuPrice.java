package com.dino.backend.features.pricing.domain;

import com.dino.backend.features.productcatalog.domain.Sku;
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
@Table(name = "sku_prices")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sku_prices SET is_deleted = true WHERE sku_price_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SkuPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "sku_price_id")
    Long id;

    int retailPrice;

    int mainPrice;

    Integer sidePrice;

    Integer discountPercent;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", updatable = false, nullable = false)
    @JsonIgnore
    Sku sku;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_price_id", updatable = false, nullable = false)
    @JsonIgnore
    ProductPrice productPrice;

}
