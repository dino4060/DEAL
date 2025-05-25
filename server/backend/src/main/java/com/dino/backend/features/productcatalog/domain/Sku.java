package com.dino.backend.features.productcatalog.domain;

import com.dino.backend.features.inventory.domain.Inventory;
import com.dino.backend.features.ordering.domain.CartItem;
import com.dino.backend.features.ordering.domain.OrderItem;
import com.dino.backend.features.promotion.domain.DiscountedSku;
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
@Table(name = "skus")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE skus SET is_deleted = true WHERE sku_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Sku extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "skuId", updatable = false, nullable = false)
    String id;

    String status;

    @Column(nullable = false)
    String code;

    @Column(nullable = false)
    List<Integer> tierOptionIndexes;

    String tierOptionValue;

    Integer retailPrice;

    Integer productionCost;

    @OneToOne(mappedBy = "sku", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Inventory inventory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId", updatable = false, nullable = false)
    @JsonIgnore
    Product product;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<DiscountedSku> discountedSkus;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    @JsonIgnore
    List<CartItem> cartItems;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    @JsonIgnore
    List<OrderItem> orderItems;

    // carts => sku metrics;

}
