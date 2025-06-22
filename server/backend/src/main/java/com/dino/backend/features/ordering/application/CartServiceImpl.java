package com.dino.backend.features.ordering.application;

import com.dino.backend.features.identity.application.service.IUserService;
import com.dino.backend.features.ordering.application.mapper.ICartMapper;
import com.dino.backend.features.ordering.application.model.*;
import com.dino.backend.features.ordering.application.service.ICartService;
import com.dino.backend.features.ordering.domain.Cart;
import com.dino.backend.features.ordering.domain.CartItem;
import com.dino.backend.features.ordering.domain.repository.ICartRepository;
import com.dino.backend.features.productcatalog.application.service.ISkuService;
import com.dino.backend.features.pricing.application.service.IPricingService;
import com.dino.backend.features.shop.domain.Shop;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.application.utils.Deleted;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartServiceImpl implements ICartService {

    IUserService userService;
    ISkuService skuService;
    IPricingService pricingService;
    ICartRepository cartRepository;
    ICartMapper cartMapper;

    // HELPER //

    /**
     * findCartWithSku.
     */
    private Optional<Cart> findCartWithSku(CurrentUser currentUser) {
        return this.cartRepository.findWithSkuByBuyerId(currentUser.id());
    }

    /**
     * getCartWithSku.
     */
    private Cart getCartWithSku(CurrentUser currentUser) {
        return this.cartRepository.findWithSkuByBuyerId(currentUser.id())
                .orElseThrow(() -> new AppException(ErrorCode.CART__NOT_FOUND));
    }

    /**
     * findCartWithShop.
     */
    @Override
    public Optional<Cart> findCartWithShop(CurrentUser currentUser) {
        return cartRepository.findWithShopByBuyerId(currentUser.id());
    }

    /**
     * getCartWithShop.
     */
    @Override
    public Cart getCartWithShop(CurrentUser currentUser) {
        return this.cartRepository.findWithShopByBuyerId(currentUser.id())
                .orElseThrow(() -> new AppException(ErrorCode.CART__NOT_FOUND));
    }

    /**
     * groupCartItemByShop.
     */
    @Override
    public Optional<Map<Shop, List<CartItem>>> groupCartItemByShop(Cart cart, List<Long> cartItemIdsToFilter) {
        Map<Shop, List<CartItem>> itemsGrouped = cart.getCartItems().stream()
                .filter(item -> cartItemIdsToFilter.contains(item.getId()))
                .collect(Collectors.groupingBy(item -> item.getSku().getProduct().getShop()));

        return itemsGrouped.isEmpty() ? Optional.empty() : Optional.of(itemsGrouped);
    }

    /**
     * createCart.
     */
    private Cart createCart(CurrentUser currentUser) {
        // exclude deleted carts
        this.cartRepository.findIsDeletedByBuyerId(currentUser.id())
                .ifPresent(ignore -> {
                    throw new AppException(ErrorCode.CART__IS_DELETED);
                });
        // create
        var buyer = this.userService.get(currentUser);
        var newCart = Cart.createCart(buyer);
        return this.cartRepository.save(newCart);
    }

    // QUERY //

    /**
     * get. (get or create cart, map to response dto)
     */
    @Override
    public CartRes get(CurrentUser currentUser) {
        Cart cart = this.findCartWithShop(currentUser)
                .orElseGet(() -> this.createCart(currentUser));

        // 1. group CartItems by Shop
        Map<Shop, List<CartItem>> itemsGroupedByShop = cart.getCartItems().stream()
                .collect(Collectors.groupingBy(item -> item.getSku().getProduct().getShop()));

        // 2. build and sort CartGroups
        List<CartGroupRes> cartGroups = itemsGroupedByShop.entrySet().stream()
                .map(entry -> {
                    Shop shop = entry.getKey();
                    List<CartItem> cartItemsInGroup = entry.getValue();

                    // build CartItemsRes
                    List<CartItemRes> cartItemsRes = cartItemsInGroup.stream()
                            .map(cartItem -> {
                                // get photo of CartItem
                                var cartItemPhoto = this.skuService.getPhoto(
                                        cartItem.getSku());
                                // apply Discount to Sku
                                var skuPrice = this.pricingService.calculatePrice(cartItem.getSku(),
                                        currentUser);
                                // display CartItemRes
                                return this.cartMapper.toCartItemRes(
                                        cartItem, cartItemPhoto, skuPrice);
                            })
                            .sorted(Comparator.comparing(CartItemRes::id).reversed())
                            .toList();
                    // get id of CartGroups
                    Long latestCartItemId = cartItemsRes.stream()
                            .findFirst()
                            .map(CartItemRes::id)
                            .orElse(null);

                    return this.cartMapper.toCartGroupRes(latestCartItemId, shop, cartItemsRes);
                })
                .filter(cartGroupRes -> Objects.nonNull(cartGroupRes.id()))
                .sorted(Comparator.comparing(CartGroupRes::id).reversed())
                .toList();

        return this.cartMapper.toCartRes(cart, cartGroups);
    }

    // COMMAND //

    /**
     * addCartItem
     */
    @Override
    @Transactional
    public CartItemRes addCartItem(AddCartItemReq request, CurrentUser currentUser) {
        var cart = this.findCartWithSku(currentUser).orElseGet(() -> createCart(currentUser));
        var sku = this.skuService.getSku(request.skuId());

        // 1. addOrUpdateCartItem
        var upsertedCartItem = cart.addOrUpdateCartItem(sku, request.quantity());
        this.cartRepository.save(cart);

        return this.cartMapper.toCartItemRes(upsertedCartItem);
    }

    /**
     * updateQuantity
     */
    @Override
    public CartItemRes updateQuantity(UpdateQuantityReq request, CurrentUser currentUser) {
        var cart = this.getCartWithSku(currentUser);

        // 1. updateQuantity
        var updatedCartItem = cart.updateQuantity(request.cartItemId(), request.quantity());
        this.cartRepository.save(cart);

        return this.cartMapper.toCartItemRes(updatedCartItem);
    }

    /**
     * removeCartItems
     */
    @Override
    public Deleted removeCartItems(RemoveCartItemReq request, CurrentUser currentUser) {
        var cart = this.getCartWithSku(currentUser);

        // 1.. removeCartItem
        var removedCartItems = cart.removeCartItems(request.cartItemIds());
        this.cartRepository.save(cart);

        return Deleted.success(removedCartItems.size());
    }
}