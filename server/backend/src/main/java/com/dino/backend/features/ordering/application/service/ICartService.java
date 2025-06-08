package com.dino.backend.features.ordering.application.service;

import com.dino.backend.features.ordering.application.model.*;
import com.dino.backend.features.ordering.domain.Cart;
import com.dino.backend.features.ordering.domain.CartItem;
import com.dino.backend.features.shop.domain.Shop;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.application.utils.Deleted;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ICartService {
    // HELPER //

    Optional<Cart> findCartWithShop(CurrentUser currentUser);

    Cart getCartWithShop(CurrentUser currentUser);

    Optional<Map<Shop, List<CartItem>>> groupCartItemByShop(Cart cart, List<Long> cartItemIdsToFilter);

    // QUERY //

    CartRes get(CurrentUser currentUser);

    // COMMAND //

    CartItemRes addCartItem(AddCartItemReq request, CurrentUser currentUser);

    CartItemRes updateQuantity(UpdateQuantityReq request, CurrentUser currentUser);

    Deleted removeCartItems(RemoveCartItemReq request, CurrentUser currentUser);
}