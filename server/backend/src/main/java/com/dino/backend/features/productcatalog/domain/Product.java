package com.dino.backend.features.productcatalog.domain;

import com.dino.backend.features.productcatalog.domain.model.ProductMeta;
import com.dino.backend.features.productcatalog.domain.model.ProductSpecification;
import com.dino.backend.features.productcatalog.domain.model.ProductTierVariation;
import com.dino.backend.features.promotion.domain.DiscountedProduct;
import com.dino.backend.features.shop.domain.Shop;
import com.dino.backend.shared.model.BaseEntity;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.*;

import java.util.List;

@Entity
@Table(name = "products")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE products SET is_deleted = true WHERE product_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "productId", updatable = false, nullable = false)
    String id;

    String status;

    @Column(nullable = false)
    String name;

    String slug;

    @Column(nullable = false)
    String thumb;

    List<String> photos;

    String sizeGuidePhoto;

    String video;

    Integer retailPrice;

    Integer minRetailPrice;

    Integer maxRetailPrice;

    @Column(columnDefinition = "text")
    String description;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    List<ProductSpecification> specifications;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    List<ProductTierVariation> tierVariations;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    ProductMeta meta;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true) // NOTE: orphanRemoval: xóa các child mồ coi
    List<Sku> skus;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true) // NOTE: orphanRemoval: xóa các child mồ coi
    List<DiscountedProduct> discountedProducts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId", nullable = false)
    Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shopId", updatable = false, nullable = false)
    Shop shop;

    // stars => review

    // sales => product metrics

    // weight, unit => parcel weight

    // height + length + width => dimensions
}
