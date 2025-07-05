package com.dino.backend.features.profile.application;

import com.dino.backend.features.profile.application.service.IAddressService;
import org.springframework.stereotype.Service;

import com.dino.backend.features.profile.domain.Address;
import com.dino.backend.features.profile.domain.repository.IAddressRepository;
import com.dino.backend.shared.api.model.CurrentUser;
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
public class AddressServiceImpl implements IAddressService {

    IAddressRepository addressRepository;

    // QUERY //

    // getDefault //
    @Override
    public Address getDefault(Long userId) {
        Boolean isDefault = true;
        return this.addressRepository.findByUserIdAndIsDefault(userId, isDefault)
                .orElseThrow(() -> new AppException(ErrorCode.ADDRESS__NOT_FOUND));
    }

    @Override
    public Address getDefault(CurrentUser currentUser) {
        Boolean isDefault = true;
        return this.getDefault(currentUser.id());
    }
}
