package com.dino.backend.features.profile.domain.repository;

import com.dino.backend.features.profile.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Long> {
    // QUERY //
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsernameOrEmail(String username, String email); // value is NULL, database exists NULL, return true:
                                                                    // X (dangerous)

    // COMMAND //
    Optional<User> findByUsername(String username); // value is NULL, database exists NULL, return EMPTY: O (safe)

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);
}
