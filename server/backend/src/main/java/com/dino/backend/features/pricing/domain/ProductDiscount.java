package com.dino.backend.features.pricing.domain;

import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.lang.Nullable;
import org.springframework.util.CollectionUtils;

import com.dino.backend.features.productcatalog.domain.Product;
import com.dino.backend.features.pricing.domain.model.LevelType;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.domain.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

/**
 * Represents a discount that:
 * - Be part of a discount program,
 * - Can be applied to a product or multiple skus.
 *
 * Note for properties:
 * - totalLimit, buyerLimit == NULL is unlimited.
 */
@Entity
@Table(name = "product_discounts")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE product_discounts SET is_deleted = true WHERE product_discount_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDiscount extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "product_discount_id")
    Long id;

    Boolean isEffective;

    Integer dealPrice;

    Integer discountPercent;

    Integer totalLimit;

    Integer buyerLimit;

    Integer usedCount;

    List<Long> usedBuyerIds;

    @Enumerated(EnumType.STRING)
    @Column(name = "level_type", nullable = false)
    LevelType levelType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", updatable = false, nullable = false)
    @JsonIgnore
    Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_discount_program_id", updatable = false, nullable = false)
    @JsonIgnore
    ProductDiscountProgram productDiscountProgram;

    @OneToMany(mappedBy = "productDiscount", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<SkuDiscount> skuDiscounts;

    // INSTANCE METHODS //

    // isWithinTotalLimit //
    private boolean isWithinTotalLimit() {
        if (this.totalLimit == null || this.usedCount == null)
            return true;

        return this.usedCount < this.totalLimit;
    }

    // isWithinTotalLimit //
    private boolean isWithinBuyerLimit(CurrentUser currentUser) {
        if (this.buyerLimit == null || CollectionUtils.isEmpty(this.usedBuyerIds))
            return true;

        long count = this.usedBuyerIds.stream()
                .filter(id -> id.equals(currentUser.id()))
                .count();
        return count < this.buyerLimit;
    }

    // canApply //
    public boolean canApply(@Nullable CurrentUser currentUser) {
        if (!this.isWithinTotalLimit())
            return false;

        if (currentUser != null && !this.isWithinBuyerLimit(currentUser))
            return false;

        return this.productDiscountProgram.isActive();
    }
}
