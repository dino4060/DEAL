package com.dino.backend.features.product.application.mapper;

import com.dino.backend.features.product.application.model.ProductOfShopRes;
import com.dino.backend.features.product.domain.model.ProductItemView;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.dino.backend.features.product.application.model.ProductWithPriceRes;
import com.dino.backend.features.product.application.model.ProductRes;
import com.dino.backend.features.product.domain.Product;
import com.dino.backend.features.product.domain.model.ProductProjection;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IProductMapper {
    ProductRes toProductRes(Product product);

    ProductWithPriceRes toProductItemRes(ProductProjection product);

    ProductWithPriceRes toProductItemRes(ProductItemView product);

    ProductOfShopRes toProductOfShopRes(Product product);
}
