package com.dino.backend.features.userprofile.api;

import com.dino.backend.features.userprofile.application.IAddressAppService;
import com.dino.backend.features.userprofile.domain.Address;
import com.dino.backend.shared.api.annotation.AuthUser;
import com.dino.backend.shared.api.model.CurrentUser;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BuyerAddressController {

    // PublicBuyerAddressController //

    // PrivateBuyerAddressController //
    @RestController
    @RequestMapping("/api/v1/addresses")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PrivateBuyerAddressController {

        IAddressAppService addressAppService;

        // QUERY //

        // getDefault //
        @GetMapping("/default")
        public ResponseEntity<Address> getDefault(@AuthUser CurrentUser currentUser) {

            return ResponseEntity.ok(this.addressAppService.getDefault(currentUser));
        }
    }
}
