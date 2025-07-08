// src/api/index.ts
import { addressesApi } from "./addresses.api";
import { authApi } from "./auth.api";
import { categoriesApi } from "./categories.api";
// import { discountsApi } from "./discounts.api";
import { productsApi } from "./products.api";
import { cartsApi } from "./carts.api";
import { checkoutApi } from "./checkout.api";

export const api = {
  auth: authApi,
  category: categoriesApi,
  products: productsApi,
  addresses: addressesApi,
  // discounts: discountsApi,
  carts: cartsApi,
  checkout: checkoutApi,
}