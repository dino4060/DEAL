package com.dino.backend.features.profile.application.model;

import com.dino.backend.features.profile.domain.model.BusinessType;
import com.dino.backend.shared.application.constant.Validation;
import jakarta.validation.constraints.*;

public record VerifyShopReq(
        @NotNull(message = "SHOP__BUSINESS_VALIDATION")
        BusinessType businessType,

        @NotBlank(message = "SHOP__NAME_VALIDATION")
        @Size(max = 40, message = "SHOP__NAME_VALIDATION")
        String name,

        @NotBlank(message = "SHOP__EMAIL_VALIDATION")
        @Email(message = "SHOP__EMAIL_VALIDATION")
        String contactEmail,

        @NotBlank(message = "SHOP__PHONE_VALIDATION")
        @Pattern(regexp = Validation.VIETNAM_PHONE, message = "SHOP__PHONE_VALIDATION")
        String contactPhone
) {
}
