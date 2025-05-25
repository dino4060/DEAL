package com.dino.backend.features.promotion.domain;

import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.dino.backend.features.promotion.domain.model.DiscountStatusType;
import com.dino.backend.features.shop.domain.Shop;
import com.dino.backend.infrastructure.aop.AppException;
import com.dino.backend.infrastructure.aop.ErrorCode;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Nonnull;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
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

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "discount_type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "discounts")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE discounts SET is_deleted = true WHERE discount_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class Discount extends Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "discount_id", updatable = false, nullable = false)
    String id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_type")
    DiscountStatusType statusType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", updatable = false, nullable = false)
    @JsonIgnore
    Shop shop;

    @OneToMany(mappedBy = "discount", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<DiscountedProduct> discountedProducts;

    // getPriority //
    public static int getPriority(@Nonnull Discount discount) {
        if (discount instanceof FlashSaleDiscount)
            return 0;
        if (discount instanceof NewArrivalDiscount)
            return 1;
        if (discount instanceof ProductDiscount)
            return 2;

        throw new AppException(ErrorCode.SYSTEM__KEY_UNSUPPORTED);
    }

}