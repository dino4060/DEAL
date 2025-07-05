package com.dino.backend.features.productcatalog.application;

import com.dino.backend.features.productcatalog.application.mapper.IProductMapper;
import com.dino.backend.features.productcatalog.application.model.ProductItemRes;
import com.dino.backend.features.productcatalog.application.model.ProductRes;
import com.dino.backend.features.productcatalog.application.service.IProductService;
import com.dino.backend.features.productcatalog.domain.repository.IProductRepository;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.application.utils.Id;
import com.dino.backend.shared.application.utils.PageRes;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductServiceImpl implements IProductService {

    IProductRepository productRepository;

    IProductMapper productMapper;

    // QUERY //

    // list //
    @Override
    public PageRes<ProductItemRes> listProducts(Pageable pageable) {
        var page = this.productRepository.findAllProjectedBy(pageable);

        var products = page.getContent().stream()
                .map(p -> this.productMapper.toProductItemRes(p))
                .toList();

        return PageRes.from(page, products);
    }

    // getById //
    @Override
    public ProductRes getProduct(Id id) {
        var product = this.productRepository.findWithSkusById(id.value())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT__NOT_FOUND));

        return this.productMapper.toProductRes(product);
    }
}
