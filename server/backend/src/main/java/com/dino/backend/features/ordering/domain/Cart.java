package com.dino.backend.features.ordering.domain;

import com.dino.backend.features.profile.domain.User;
import com.dino.backend.features.product.domain.Sku;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import com.dino.backend.shared.domain.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE carts SET is_deleted = true WHERE cart_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Cart extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "cart_id")
    Long id;

    int total;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false, updatable = false)
    @JsonIgnore
    User buyer;

    @OneToMany(mappedBy = "cart", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<CartItem> cartItems;

    // SETTERS //

    public void setTotal(int total) {
        if (total < 0)
            throw new AppException(ErrorCode.CART__TOTAL_MIN_INVALID);
        if (total > 100)
            throw new AppException(ErrorCode.CART__TOTAL_MAX_INVALID);

        this.total = total;
    }

    // FACTORY METHODS //

    /**
     * createCart.
     */
    public static Cart createCart(User buyer) {
        Cart cart = new Cart();

        cart.setCartItems(new ArrayList<>());
        cart.setTotal(0);
        cart.setBuyer(buyer);

        return cart;
    }

    // INSTANCE METHODS //

    /**
     * addCartItem.
     */
    public CartItem addCartItem(Sku sku, int quantity) {
        CartItem item = CartItem.createCartItem(this, sku, quantity);

        this.getCartItems().add(item);
        this.setTotal(this.getTotal() + 1);

        return item;
    }

    /**
     * addOrUpdateCartItem.
     * (check CartItem is existing => increaseQuantity or addCartItem)
     */
    public CartItem addOrUpdateCartItem(Sku sku, int quantity) {
        return this.cartItems.stream()
                .filter(item -> item.getSku().getId().equals(sku.getId()))
                .findFirst()
                .map(cartItem -> {
                    cartItem.increaseQuantity(quantity);
                    return cartItem;
                })
                .orElseGet(() -> {
                    return this.addCartItem(sku, quantity);
                });
    }

    /**
     * updateQuantity.
     * (check CartItem is existing => updateQuantity or CART__ITEM_NOT_FOUND)
     */
    public CartItem updateQuantity(Long cartItemId, int quantity) {
        return this.getCartItems().stream()
                .filter(cartItem -> cartItem.getId().equals(cartItemId))
                .findFirst()
                .map(cartItem -> {
                    cartItem.updateQuantity(quantity);
                    return cartItem;
                })
                .orElseThrow(() -> new AppException(ErrorCode.CART__ITEM_NOT_FOUND));
    }

    /**
     * removeCartItems.
     */
    public List<CartItem> removeCartItems(List<Long> cartItemIds) {
        // NOTE: orphanRemoval
        // 1. filter CartItems (objects on memory) to remove
        var cartItemsToRemove = this.getCartItems().stream()
                .filter(cartItem -> cartItemIds.contains(cartItem.getId()))
                .toList();

        // 2. removeAll items => JPA note they are orphan => orphanRemoval auto delete
        this.getCartItems().removeAll(cartItemsToRemove);
        this.setTotal(this.getTotal() - cartItemsToRemove.size());

        return cartItemsToRemove;
    }

    public List<CartItem> removeCartItemsBySkuIds(List<Long> skuIds) {
        // NOTE: orphanRemoval
        // 1. filter CartItems (objects on memory) to remove
        var cartItemsToRemove = this.getCartItems().stream()
                .filter(cartItem -> skuIds.contains(cartItem.getSku().getId()))
                .toList();

        // 2. removeAll items => JPA note they are orphan => orphanRemoval auto delete
        this.getCartItems().removeAll(cartItemsToRemove);
        this.setTotal(this.getTotal() - cartItemsToRemove.size());

        return cartItemsToRemove;
    }
}
