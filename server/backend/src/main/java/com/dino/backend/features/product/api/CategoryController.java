package com.dino.backend.features.product.api;

import com.dino.backend.features.product.application.model.projection.CategoryProjection;
import com.dino.backend.features.product.application.ICategoryQueryService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {
    // BUYER //
    @RestController
    @RequestMapping("/api/v1/category")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class CategoryBuyerController {

        ICategoryQueryService categoryQueryService;

        // READ //
        @GetMapping("/tree")
        public ResponseEntity<List<CategoryProjection>> getTree() {
            return ResponseEntity
                    .ok()
                    .body(this.categoryQueryService.getTree());
        }
    }
}
