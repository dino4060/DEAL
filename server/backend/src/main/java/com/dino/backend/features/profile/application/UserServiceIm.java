package com.dino.backend.features.profile.application;

import com.dino.backend.features.identity.application.provider.IIdentitySecurityProvider;
import com.dino.backend.features.identity.domain.model.Role;
import com.dino.backend.features.profile.application.service.IUserService;
import com.dino.backend.features.profile.domain.User;
import com.dino.backend.features.profile.domain.repository.IUserRepository;
import com.dino.backend.shared.api.model.CurrentUser;
import com.dino.backend.shared.domain.exception.AppException;
import com.dino.backend.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserServiceIm implements IUserService {

    IUserRepository userRepository;
    IIdentitySecurityProvider securityProvider;

    @Override
    public Optional<User> findUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public User getUserById(Long userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER__NOT_FOUND));
    }

    @Override
    public User getUser(CurrentUser currentUser) {
        return this.getUserById(currentUser.id());
    }

    @Override
    public User createEmailName(String email, String name, Role role) {
        User user = User.createThirdUser(email, name, role);
        return this.userRepository.save(user);
    }

    @Override
    public User createEmailPass(String email, String plainPass, Role role) {
        String hashPass = this.securityProvider.hashPassword(plainPass);
        User user = User.createEmailUser(email, hashPass, role);
        return this.userRepository.save(user);
    }

    @Override
    public User addRole(User user, Role role) {
        user.addRole(role);
        return this.userRepository.save(user);
    }
}
