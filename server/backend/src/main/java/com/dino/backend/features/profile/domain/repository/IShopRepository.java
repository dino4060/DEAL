package com.dino.backend.features.profile.domain.repository;

import com.dino.backend.features.profile.domain.Shop;
import com.dino.backend.features.profile.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IShopRepository extends JpaRepository<Shop, Long> {
    Optional<Shop> findBySellerId(Long sellerId);
}