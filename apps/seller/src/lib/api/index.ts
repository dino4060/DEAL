// src/lib/api/index.ts
import { authApi } from "./auth.api";
import { productsApi } from "./products.api";
import { shopsApi } from "./shops.api";

export const api = {
  auth: authApi,
  shops: shopsApi,
  products: productsApi,
};