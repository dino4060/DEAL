package com.dino.backend.features.productcatalog.api;

import com.dino.backend.features.productcatalog.application.IProductAppService;
import com.dino.backend.features.productcatalog.domain.Product;
import com.dino.backend.features.productcatalog.domain.model.ProductProjection;
import com.dino.backend.shared.utils.PageRes;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BuyerProductController {

    // BuyerPublicProductController //
    @RestController
    @RequestMapping("/api/v1/public/products")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class BuyerPublicProductController {

        IProductAppService productAppService;

        // QUERY //

        // list //
        @GetMapping("/list")
        public ResponseEntity<PageRes<ProductProjection>> list(
                @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
            return ResponseEntity.ok(this.productAppService.list(pageable));
        }

        @GetMapping("/{id}")
        public ResponseEntity<Product> getById(@PathVariable String id) {

            return ResponseEntity.ok(this.productAppService.getById(id));
        }

    }
}
