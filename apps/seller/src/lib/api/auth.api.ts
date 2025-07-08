// src/api/auth.api.ts
import type { TAuthResult, TAuthEmailBody } from "../../types/auth.types";
import { HttpMethod, type TApiDefinition } from "../../types/base.types";
import type { TCurrentShop } from "../../types/shop.types";
import { RESOURCES } from "../constants";

export const authApi = {
  // PUBLIC SELLER AUTH CONTROLLER //

  // QUERY //

  // COMMAND //

  login: (body: TAuthEmailBody): TApiDefinition<TAuthResult> => ({
    route: `${RESOURCES.AUTH.PUBLIC}/login/email`,
    method: HttpMethod.POST,
    body
  }),

  signup: (body: TAuthEmailBody): TApiDefinition<TAuthResult> => ({
    route: `${RESOURCES.AUTH.PUBLIC}/signup/email`,
    method: HttpMethod.POST,
    body
  }),

  refresh: (): TApiDefinition<TAuthResult> => ({
    route: `${RESOURCES.AUTH.PUBLIC}/refresh`,
    method: HttpMethod.POST
  }),

  // PRIVATE SELLER AUTH CONTROLLER //

  // QUERY //

  getCurrentShop: (): TApiDefinition<TCurrentShop> => ({
    route: `${RESOURCES.AUTH.PRIVATE}/me`,
    method: HttpMethod.GET,
    withAuth: true,
  }),

  // COMMAND //
  logout: (): TApiDefinition<TAuthResult> => ({
    route: `${RESOURCES.AUTH.PRIVATE}/logout`,
    method: HttpMethod.POST,
    withAuth: true,
  }),
};