package com.dino.backend.features.pricing.domain;

import com.dino.backend.features.productcatalog.domain.Product;
import com.dino.backend.shared.domain.model.BaseEntity;
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
@Table(name = "product_prices")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE product_prices SET is_deleted = true WHERE product_price_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductPrice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "product_price_id")
    Long id;

    int retailPrice;

    int mainPrice;

    Integer sidePrice;

    Integer discountPercent;

    Integer minRetailPrice;

    Integer maxRetailPrice;

    Integer minMainPrice;

    Integer maxMainPrice;

    Integer minSidePrice;

    Integer maxSidePrice;

    Integer minDiscountPercent;

    Integer maxDiscountPercent;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, updatable = false)
    @JsonIgnore
    Product product;

    @OneToMany(mappedBy = "productPrice", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<SkuPrice> skuPrices;
}
