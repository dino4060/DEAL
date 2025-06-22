package com.dino.backend.features.productcatalog.domain.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductItemView {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    Long id;
    String status;
    Instant updatedAt;
    String name;
    String thumb;
    Integer retailPrice;
    ProductMeta meta;
    Float rank;
    
    /**
     * Constructor được sử dụng bởi @ConstructorResult trong @SqlResultSetMapping.
     */
    public ProductItemView(
            Long id,
            String status, Instant updatedAt, String name, String thumb, Integer retailPrice,
            String metaJson,
            Float rank

    ) {
        this.id = id;
        this.status = status;
        this.updatedAt = updatedAt;
        this.name = name;
        this.thumb = thumb;
        this.retailPrice = retailPrice;

        try {
            this.meta = (metaJson == null) ? null : objectMapper.readValue(metaJson, ProductMeta.class);
        } catch (JsonProcessingException e) {
            this.meta = null;
        }

        this.rank = rank;
    }

}
