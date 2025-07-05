package com.dino.backend.features.profile.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dino.backend.features.profile.domain.Address;

public interface IAddressRepository extends JpaRepository<Address, Long> {
    // QUERY //

    Optional<Address> findByUserIdAndIsDefault(Long userId, Boolean isDefault);
}
