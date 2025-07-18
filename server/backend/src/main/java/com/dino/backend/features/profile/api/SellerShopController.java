package com.dino.backend.features.profile.api;

import com.dino.backend.features.profile.application.model.VerifyShopReq;
import com.dino.backend.features.profile.application.model.VerifyShopRes;
import com.dino.backend.features.profile.application.service.IShopService;
import com.dino.backend.shared.api.annotation.AuthUser;
import com.dino.backend.shared.api.model.CurrentUser;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SellerShopController {

    // PublicSellerShopController //

    // PrivateSellerShopController //
    @RestController
    @RequestMapping("/api/v1/seller/shops")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PrivateSellerShopController {

        IShopService shopService;

        // QUERY //

        // COMMAND //

        // verifyShop //
        @PostMapping("/verify")
        public ResponseEntity<VerifyShopRes> verifyShop(
                @RequestBody VerifyShopReq request, @AuthUser CurrentUser currentUser
        ) {
            return ResponseEntity.ok(this.shopService.verifyShop(request, currentUser));
        }
    }
}
