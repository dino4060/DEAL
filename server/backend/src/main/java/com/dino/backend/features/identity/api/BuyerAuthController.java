package com.dino.backend.features.identity.api;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dino.backend.features.identity.application.IAuthAppService;
import com.dino.backend.features.identity.application.model.AuthResponse;
import com.dino.backend.features.identity.application.model.CurrentUserResponse;
import com.dino.backend.features.identity.application.model.GoogleOauth2Request;
import com.dino.backend.features.identity.application.model.LookupIdentifierResponse;
import com.dino.backend.features.identity.application.model.PasswordLoginRequest;
import com.dino.backend.infrastructure.web.annotation.AuthUser;
import com.dino.backend.infrastructure.web.model.CurrentUser;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
public class BuyerAuthController {

        // PublicBuyerAuthController //
        @RestController
        @RequestMapping("/api/v1/public/auth")
        @AllArgsConstructor
        @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
        public static class PublicBuyerAuthController {

                IAuthAppService authAppService;

                // QUERY //

                // lookupIdentifier //
                @GetMapping("/lookup")
                public ResponseEntity<LookupIdentifierResponse> lookupIdentifier(
                                @RequestParam("email") String email) {
                        return ResponseEntity.ok(this.authAppService.lookupIdentifier(email));
                }

                // COMMAND //

                // loginWithPassword //
                @PostMapping("/login/password")
                public ResponseEntity<AuthResponse> loginWithPassword(
                                @Valid @RequestBody PasswordLoginRequest request) {
                        HttpHeaders headers = new HttpHeaders();
                        AuthResponse body = this.authAppService.login(request, headers);

                        return ResponseEntity
                                        .ok()
                                        .headers(headers)
                                        .body(body);
                }

                // signupWithPassword //
                @PostMapping("/signup/password")
                public ResponseEntity<AuthResponse> signupWithPassword(
                                @Valid @RequestBody PasswordLoginRequest request) {
                        HttpHeaders headers = new HttpHeaders();
                        AuthResponse body = this.authAppService.signup(request, headers);

                        return ResponseEntity
                                        .ok()
                                        .headers(headers)
                                        .body(body);
                }

                // loginOrSignupWithGoogle //
                @PostMapping("/oauth2/google")
                public ResponseEntity<AuthResponse> loginOrSignupWithGoogle(
                                @RequestBody GoogleOauth2Request request) {
                        HttpHeaders headers = new HttpHeaders();
                        AuthResponse body = this.authAppService.loginOrSignup(request, headers);

                        return ResponseEntity
                                        .ok()
                                        .headers(headers)
                                        .body(body);
                }

                // refreshToken //
                @PostMapping("/refresh")
                public ResponseEntity<AuthResponse> refresh(
                                @CookieValue(name = "REFRESH_TOKEN", required = false) String refreshToken) {
                        HttpHeaders headers = new HttpHeaders();
                        AuthResponse authResponse = authAppService.refresh(refreshToken, headers);

                        return ResponseEntity
                                        .ok()
                                        .headers(headers)
                                        .body(authResponse);
                }

        }

        // PrivateBuyerAuthController //
        @RestController
        @RequestMapping("/api/v1/auth")
        @AllArgsConstructor
        @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
        public static class PrivateBuyerAuthController {

                IAuthAppService authAppService;

                // QUERY //

                // getCurrentUser //
                @GetMapping("/me")
                public ResponseEntity<CurrentUserResponse> getCurrentUser(@AuthUser CurrentUser currentUser) {
                        return ResponseEntity.ok(this.authAppService.getCurrentUser(currentUser));
                }

                // COMMAND //

                @PostMapping("/logout")
                public ResponseEntity<AuthResponse> logout(
                                @CookieValue(name = "REFRESH_TOKEN", required = false) String refreshToken) {
                        HttpHeaders headers = new HttpHeaders();
                        AuthResponse authResponse = this.authAppService.logout(refreshToken, headers);

                        return ResponseEntity
                                        .ok()
                                        .headers(headers)
                                        .body(authResponse);
                }

        }
}
