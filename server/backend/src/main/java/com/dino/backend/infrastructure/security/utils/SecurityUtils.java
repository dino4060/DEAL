package com.dino.backend.infrastructure.security.utils;

import com.dino.backend.infrastructure.aop.AppException;
import com.dino.backend.infrastructure.aop.ErrorCode;
import com.dino.backend.infrastructure.web.model.CurrentUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public final class SecurityUtils {

    private SecurityUtils() {
    }

    // getAuthentication //
    private static Optional<Authentication> getAuthentication() {
        // 1. get Security Context
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        // 2. can be null
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }
        return Optional.of(authentication);
    }

    /**
     * // extractPrincipal //
     * 
     * @des extract the subject, a claim of jwt payload, from jwt principal
     * @param authentication: Authentication
     * @return String
     */
    private static Optional<String> extractPrincipal(Authentication authentication) {
        // Code: authentication.getPrincipal() instanceof Jwt jwt
        // Mean: if authentication.getPrincipal() has the Jwt type, assign it to the jwt
        // variable
        String subject = null;

        if (authentication.getPrincipal() instanceof UserDetails springSecurityUser) {
            subject = springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof Jwt jwt) {
            subject = jwt.getSubject();
        } else if (authentication.getPrincipal() instanceof String string) {
            subject = string;
        }

        return Optional.ofNullable(subject);
    }

    // getCurrentUserId //
    public static String getCurrentUserId() {
        // 1. get Security Context
        var authentication = getAuthentication();

        // 2. get the subject, a claim of jwt payload
        return authentication
                .map(value -> extractPrincipal(value)
                        .orElseThrow(() -> new AppException(ErrorCode.SECURITY__GET_CURRENT_USER_FAILED)))
                .orElse(null);
    }

    // getCurrentUserRoles //
    public static Set<String> getCurrentUserRoles() {
        // 1. get Security Context
        var authentication = getAuthentication();

        // 2. get the roles, a claim of jwt payload
        return authentication
                .map(value -> value.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toSet()))
                .orElse(null);
    }

    /**
     * // getCurrentUser //
     *
     * @des Get the current user from the jwt payload
     * @return the current user.
     */
    public static CurrentUser getCurrentUser() {
        return new CurrentUser(getCurrentUserId(), getCurrentUserRoles());
    }
}
