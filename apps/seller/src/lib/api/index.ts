// src/api/index.ts
import { authApi } from "./auth.api";
import { shopsApi } from "./shops.api";

export const api = {
  auth: authApi,
  shop: shopsApi
};