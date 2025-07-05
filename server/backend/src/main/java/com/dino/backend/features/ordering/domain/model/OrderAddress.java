package com.dino.backend.features.ordering.domain.model;

import com.dino.backend.features.profile.domain.Address;
import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderAddress {

    String contactName;

    String contactPhone;

    String province;

    String district;

    String commune;

    String street;

    // FACTORY //

    public static OrderAddress createOrderAddress(Address address) {
        return new OrderAddress(
                address.getContactName(),
                address.getContactPhone(),
                address.getProvince(),
                address.getDistrict(),
                address.getCommune(),
                address.getStreet()
        );
    }
}
