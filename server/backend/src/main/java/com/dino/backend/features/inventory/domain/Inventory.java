package com.dino.backend.features.inventory.domain;

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
@Table(name = "inventories")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE inventories SET is_deleted = true WHERE inventory_id = ?")
@SQLRestriction("is_deleted = false")
@SuperBuilder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Inventory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "inventory_id")
    Long id;

    int stocks;

    int sales;

    int total;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", nullable = false, updatable = false)
    Sku sku;

    // SETTERS //

    public void setStocks(int stocks) {
        if (stocks < 0)
            throw new AppException(ErrorCode.INVENTORY__STOCKS_UNDER_MIN);
        this.stocks = stocks;
    }

    public void setSales(int sales) {
        if (sales < 0)
            throw new AppException(ErrorCode.INVENTORY__SALES_UNDER_MIN);
        this.sales = sales;
    }

    // INSTANCE METHODS //
    public void reverseStock(int quantity) {
        this.setStocks(this.getStocks() - quantity);
        this.setSales(this.getSales() + quantity);
    }
}
