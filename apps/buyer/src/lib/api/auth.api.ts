// src/api/auth.api.ts
import { TAuthResponse, TLoginOrSignUpWithGoogleBody, TLoginWithPasswordBody, TLookupIdentifierQuery, TLookupIdentifierResponse, TUser } from "../../types/auth.types";
import { TApiDefinition, HttpMethod } from "@/types/base.types";
import { RESOURCES } from "../constants";

export const authApi = {
    // PUBLIC //

    // QUERY //
    lookupIdentifier: (query: TLookupIdentifierQuery): TApiDefinition<TLookupIdentifierResponse> => ({
        route: `${RESOURCES.AUTH.PUBLIC}/lookup`,
        method: HttpMethod.GET,
        query,
    }),

    // COMMAND //
    loginWithPassword: (body: TLoginWithPasswordBody): TApiDefinition<TAuthResponse> => ({
        route: `${RESOURCES.AUTH.PUBLIC}/login/password`,
        method: HttpMethod.POST,
        body,
    }),

    signupWithPassword: (body: TLoginWithPasswordBody): TApiDefinition<TAuthResponse> => ({
        route: `${RESOURCES.AUTH.PUBLIC}/signup/password`,
        method: HttpMethod.POST,
        body,
    }),

    loginOrSignupWithGoogle: (body: TLoginOrSignUpWithGoogleBody): TApiDefinition<TAuthResponse> => ({
        route: `${RESOURCES.AUTH.PUBLIC}/oauth2/google`,
        method: HttpMethod.POST,
        body,
    }),

    refresh: (): TApiDefinition<TAuthResponse> => ({
        route: `${RESOURCES.AUTH.PUBLIC}/refresh`,
        method: HttpMethod.POST,
    }),

    // RESOURCE //

    // QUERY //
    getCurrentUser: (): TApiDefinition<TUser> => ({
        route: `${RESOURCES.AUTH.PRIVATE}/me`,
        method: HttpMethod.GET,
    }),

    // COMMAND //
    logout: (): TApiDefinition<TAuthResponse> => ({
        route: `${RESOURCES.AUTH.PRIVATE}/logout`,
        method: HttpMethod.POST,
    }),
}