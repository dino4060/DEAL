package com.dino.backend.features.promotion.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dino.backend.features.promotion.application.IDiscountedProductService;
import com.dino.backend.infrastructure.web.annotation.AuthUser;
import com.dino.backend.infrastructure.web.model.CurrentUser;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
public class BuyerDiscountedProductController {

    // PublicBuyerDiscountedProductController //

    // PrivateBuyerDiscountedProductController //
    @RestController
    @RequestMapping("/api/v1/discounted")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PrivateBuyerDiscountedProductController {

        IDiscountedProductService discountedProductAppService;

        // QUERY //

        // getByProductId //
        @GetMapping("/{id}")
        public ResponseEntity<Object> getByProductId(@PathVariable String id, @AuthUser CurrentUser currentUser) {

            return ResponseEntity.ok(discountedProductAppService.getByProductId(id, currentUser));
        }
    }
}
