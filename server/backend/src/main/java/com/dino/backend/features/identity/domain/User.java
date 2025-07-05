package com.dino.backend.features.identity.domain;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.dino.backend.features.identity.domain.model.UserRoleType;
import com.dino.backend.features.identity.domain.model.UserStatusType;
import com.dino.backend.features.ordering.domain.Cart;
import com.dino.backend.features.ordering.domain.Order;
import com.dino.backend.features.profile.domain.Address;
import com.dino.backend.shared.domain.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "users")
@DynamicInsert // ignore null-value attributes
@DynamicUpdate
@SQLDelete(sql = "UPDATE users SET is_deleted = true WHERE user_id=?")
@SQLRestriction("is_deleted = false")
@SuperBuilder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "user_id")
    Long id;

    String status;

    @Column(nullable = false, unique = true)
    String username;

    @Column(unique = true)
    String email;

    @Column(unique = true)
    String phone;

    String password;

    @Column(nullable = false)
    Set<String> roles;

    String name;

    String photo;

    Date dob;

    String gender;

    Boolean isEmailVerified;

    Boolean isPhoneVerified;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    Token token;

    @OneToOne(mappedBy = "buyer", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    Cart cart;

    // @OneToOne(mappedBy = "seller", fetch = FetchType.LAZY, cascade =
    // CascadeType.ALL, orphanRemoval = true)
    // @JsonIgnore
    // @ToString.Exclude
    // Shop shop;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    List<Address> addresses;

    @OneToMany(mappedBy = "buyer", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    List<Order> orders;

    // EXP: the validation layer ensured:
    // - email: ensure the format
    // - password: ensure the size of 6
    public static User createSignupUser(User user, String hashPassword) {
        User newUser = User.builder()
                .status(UserStatusType.LACK_INFO.toString())
                .roles(new HashSet<>(Collections.singletonList(UserRoleType.BUYER.toString())))
                .username("user" + System.currentTimeMillis())
                .password(hashPassword)
                .email(user.getEmail())
                .isEmailVerified(false)
                .name(user.getName())
                .build();

        Token newToken = Token.createToken(newUser);
        newUser.setToken(newToken);

        Cart newCart = Cart.createCart(newUser);
        newUser.setCart(newCart);

        return newUser;
    }
}
