package com.dino.backend.infrastructure.web.annotation.impl;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.dino.backend.infrastructure.security.utils.SecurityUtils;
import com.dino.backend.infrastructure.web.annotation.AuthUser;
import com.dino.backend.infrastructure.web.model.CurrentUser;

@Component
public class AuthUserArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {

        return parameter.hasParameterAnnotation(AuthUser.class)
                && parameter.getParameterType().equals(CurrentUser.class);
    }

    @Override
    public Object resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory) throws Exception {

        return SecurityUtils.getCurrentUser();
    }
}
