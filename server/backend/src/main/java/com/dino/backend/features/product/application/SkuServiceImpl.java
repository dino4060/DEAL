package com.dino.backend.features.product.application;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.dino.backend.features.product.application.service.ISkuService;
import com.dino.backend.features.product.domain.Sku;
import com.dino.backend.features.product.domain.repository.ISkuRepository;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SkuServiceImpl implements ISkuService {

    ISkuRepository skuRepository;

    // DOMAIN //

    @Override
    public Sku getSku(Long skuId) {
        return this.findSku(skuId)
                .orElseThrow(() -> new AppException(ErrorCode.SKU__FIND_FAILED));
    }

    @Override
    public Optional<Sku> findSku(Long skuId) {
        return this.skuRepository.findById(skuId);
    }

    @Override
    public String getPhoto(Sku sku) {
        try {
            // tierVariations is single => return product thumb
            var tierVariations = sku.getProduct().getTierVariations();
            if (CollectionUtils.isEmpty(tierVariations))
                return sku.getProduct().getThumb();

            // get tierOptionPhotos
            var tierOptionIndexes = Sku.createTierOptionIndexes(sku.getTierOptionIndexes(), tierVariations);
            var tierOptionPhotos = new ArrayList<String>();

            for (int tierIdx = 0; tierIdx < tierOptionIndexes.size(); tierIdx++) {
                var optionIdx = tierOptionIndexes.get(tierIdx);
                var options = tierVariations.get(tierIdx).getOptions();

                var photo = options.get(optionIdx).getPhoto();
                tierOptionPhotos.add(photo);
            }

            // get sku photo
            return tierOptionPhotos.stream()
                    .filter(Objects::nonNull)
                    .findFirst()
                    .orElse(sku.getProduct().getThumb());

        } catch (AppException e) {
            log.warn("Sku.tierOptionIndexes is invalid {}: {}", sku.getId(), e.getMessage());
            return sku.getProduct().getThumb();
        }
    }
}
