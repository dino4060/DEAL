package com.dino.backend.features.productcatalog.domain;

import com.dino.backend.features.pricing.domain.ProductPrice;
import com.dino.backend.features.productcatalog.domain.model.ProductMeta;
import com.dino.backend.features.productcatalog.domain.model.ProductSpecification;
import com.dino.backend.features.productcatalog.domain.model.ProductStatus;
import com.dino.backend.features.productcatalog.domain.model.ProductTierVariation;
import com.dino.backend.features.pricing.domain.ProductDiscount;
import com.dino.backend.features.shop.domain.Shop;
import com.dino.backend.shared.domain.model.BaseEntity;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "product_id")
    Long id;

    @Enumerated(EnumType.STRING)
    ProductStatus status;

    @Column(nullable = false)
    String name;

    String slug;

    @Column(nullable = false)
    String thumb;

    List<String> photos;

    String sizeGuidePhoto;

    String video;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_branch_id")
    CategoryBranch categoryBranch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", updatable = false, nullable = false)
    Shop shop;

    @OneToOne(mappedBy = "product")
    ProductPrice productPrice;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<Sku> skus;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<ProductDiscount> productDiscounts;
}
