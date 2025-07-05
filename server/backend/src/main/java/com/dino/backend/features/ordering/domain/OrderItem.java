package com.dino.backend.features.ordering.domain;

import com.dino.backend.features.productcatalog.domain.Sku;
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

@Entity
@Table(name = "order_items")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE order_items SET is_deleted = true WHERE order_item_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "order_item_id")
    Long id;

    int quantity;

    int mainPrice;

    Integer sidePrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, updatable = false)
    Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", nullable = false, updatable = false)
    Sku sku;

    // SETTER //

    public void setQuantity(int quantity) {
        if (quantity < 1)
            throw new AppException(ErrorCode.ORDER__QUANTITY_UNDER_MIN);
        if (quantity > 100)
            throw new AppException(ErrorCode.ORDER__QUANTITY_OVER_MAX);

        this.quantity = quantity;
    }

    public void setMainPrice(int mainPrice) {
        if (mainPrice < 1000)
            throw new AppException(ErrorCode.ORDER__MAIN_PRICE_INVALID);

        // if sidePrice != 0, check mainPrice < sidePrice
        if (this.sidePrice != 0 && mainPrice >= this.sidePrice)
            throw new AppException(ErrorCode.ORDER__MAIN_PRICE_INVALID);

        this.mainPrice = mainPrice;
    }

    public void setSidePrice(int sidePrice) {
        if (sidePrice != 0 && sidePrice <= 1000)
            throw new AppException(ErrorCode.ORDER__SIDE_PRICE_INVALID);

        // if sidePrice > 0, check sidePrice > mainPrice
        if (sidePrice != 0 && this.mainPrice >= sidePrice)
            throw new AppException(ErrorCode.ORDER__SIDE_PRICE_INVALID);

        this.sidePrice = sidePrice;
    }


    // FACTORY //

    public static OrderItem createOrderItem(Sku sku, int quantity) {
        var item = new OrderItem();

        item.setQuantity(quantity);
        item.setMainPrice(sku.getPrice().getMainPrice());
        item.setSidePrice(sku.getPrice().getSidePrice());
        item.setSku(sku);

        return item;
    }
}
