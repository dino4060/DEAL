package com.dino.backend.features.ordering.application.mapper;

import com.dino.backend.features.ordering.application.model.CartGroupRes;
import com.dino.backend.features.ordering.application.model.CartItemRes;
import com.dino.backend.features.ordering.application.model.CartRes;
import com.dino.backend.features.ordering.domain.Cart;
import com.dino.backend.features.ordering.domain.CartItem;
import com.dino.backend.features.profile.domain.Shop;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ICartMapper {

    @Mapping(source = "cartItem.sku.product", target = "product")
    CartItemRes toCartItemRes(CartItem cartItem);

    @Mapping(source = "cartItem.id", target = "id")
    @Mapping(source = "cartItem.sku.product", target = "product")
    @Mapping(source = "cartItem.sku.price", target = "price")
    CartItemRes toCartItemRes(CartItem cartItem, String photo);

    @Mapping(source = "id", target = "id")
    CartGroupRes toCartGroupRes(Long id, Shop shop, List<CartItemRes> cartItems);

    CartRes toCartRes(Cart cart, List<CartGroupRes> cartGroups);
}