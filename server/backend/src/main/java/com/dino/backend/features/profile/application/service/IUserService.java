package com.dino.backend.features.profile.application.service;

import com.dino.backend.features.profile.domain.User;
import com.dino.backend.features.identity.domain.model.Role;
import com.dino.backend.shared.api.model.CurrentUser;

import java.util.Optional;

public interface IUserService {

    Optional<User> findUserByEmail(String email);

    User getUserById(Long userId);

    User getUser(CurrentUser currentUser);

    User createEmailName(String email, String name, Role role);

    User createEmailPass(String email, String plainPass, Role role);

    User addRole(User user, Role role);
}
