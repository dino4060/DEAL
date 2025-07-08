/*
 * NOTE: Naming conventions
 * Naming conventions for suffixes
 * - Http: query, body, request
 * - Non-http: result
 * - UI: data
 * - Function: result, output
 */

// src/types/auth.types.ts
// Entity //
export type TUser = {
    status: 'LACK_INFO' | 'LIVE' | 'DEACTIVATED' | 'SUSPENDED' | 'DELETED',
    username: string,
    email: string,
    phone: string,
    isEmailVerified: boolean,
    isPhoneVerified: boolean,
    name: string,
    photo: string,
    dob: Date
    gender: 'MALE' | 'FEMALE',
}

// Query //
export type TLookupIdentifierQuery = {
    email: string;
}

// Body //
export type TLoginWithPasswordBody = {
    email: string,
    password: string,
}

export type TLoginOrSignUpWithGoogleBody = {
    code: string;
}

// Response //
export type TLookupIdentifierResponse = {
    isEmailProvided: boolean;
    isPasswordProvided: boolean;
}

export type TAuthResponse = {
    isAuthenticated: boolean;
    accessToken: string;
    currentUser: TUser,
}

// Others //
export interface CurrentUser {
    status: string;
    username: string;
    email: string;
    phone: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    name: string;
    photo: string;
}
