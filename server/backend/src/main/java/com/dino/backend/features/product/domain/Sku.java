package com.dino.backend.features.product.domain;

import com.dino.backend.features.inventory.domain.Inventory;
import com.dino.backend.features.ordering.domain.CartItem;
import com.dino.backend.features.ordering.domain.OrderItem;
import com.dino.backend.features.pricing.domain.SkuPrice;
import com.dino.backend.features.product.domain.model.ProductTierVariation;
import com.dino.backend.features.promotion.domain.SkuDiscount;
import com.dino.backend.features.product.domain.model.SkuStatus;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import com.dino.backend.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "sku_id")
    Long id;

    @Enumerated(EnumType.STRING)
    SkuStatus status;

    @Column(nullable = false)
    String code;

    @Column(nullable = false)
    List<Integer> tierOptionIndexes;

    String tierOptionValue;

    int retailPrice;

    Integer productionCost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", updatable = false, nullable = false)
    Product product;

    @OneToOne(mappedBy = "sku", cascade = CascadeType.ALL, orphanRemoval = true)
    Inventory inventory;

    @OneToOne(mappedBy = "sku", cascade = CascadeType.PERSIST, orphanRemoval = true)
    SkuPrice price;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    List<SkuDiscount> discounts;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    List<CartItem> cartItems;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    List<OrderItem> orderItems;

    // FACTORY METHOD //

    public static List<Integer> createTierOptionIndexes(
            List<Integer> tierOptionIndexes, List<ProductTierVariation> tierVariations) {
        if (tierOptionIndexes.size() != tierVariations.size())
            throw new AppException(ErrorCode.SKU__TIER_OPTION_INDEXES_INVALID);

        List<Integer> result = new ArrayList<>();

        for (int i = 0; i < tierOptionIndexes.size(); i++) {
            var tierOptionIndex = createTierOptionIndex(tierOptionIndexes.get(i), tierVariations.get(i));
            result.add(tierOptionIndex);
        }

        return List.copyOf(result);
    }

    public static Integer createTierOptionIndex(
            Integer tierOptionIndex, ProductTierVariation tierVariation) {
        if (tierOptionIndex == null || tierOptionIndex < 0 || tierOptionIndex >= tierVariation.getOptions().size())
            throw new AppException(ErrorCode.SKU__TIER_OPTION_INDEXES_INVALID);

        return tierOptionIndex;
    }

}
