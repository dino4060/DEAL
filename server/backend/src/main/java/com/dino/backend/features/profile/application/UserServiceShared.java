package com.dino.backend.features.profile.application;

import com.dino.backend.features.identity.domain.model.Role;
import com.dino.backend.features.ordering.application.service.ICartService;
import com.dino.backend.features.profile.application.service.IShopService;
import com.dino.backend.features.profile.application.service.IUserService;
import com.dino.backend.features.profile.domain.User;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserServiceShared {

    IUserService userService;
    IShopService shopService;
    ICartService cartService;

    // CONSUME //

    private void eventCreateBuyer(User buyer) {
        this.cartService.createCart(buyer);
    }

    private void eventCreateSeller(User seller) {
        this.shopService.createShop(seller);
    }

    private void eventCreateRole(User user, Role role) {
        if (role.equals(Role.BUYER)) this.eventCreateBuyer(user);
        if (role.equals(Role.SELLER)) this.eventCreateSeller(user);
    }

    // PRODUCE //

    public User createEmailName(String email, String name, Role role) {
        User user = this.userService.createEmailName(email, name, role);
        this.eventCreateRole(user, role);
        return user;
    }

    public User createEmailPass(String email, String plainPass, Role role) {
        User user = this.userService.createEmailPass(email, plainPass, role);
        this.eventCreateRole(user, role);
        return user;
    }

    public User addRole(User targetUser, Role role) {
        User user = this.userService.addRole(targetUser, role);
        this.eventCreateRole(user, role);
        return user;
    }
}
