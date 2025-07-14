// src/lib/api/products.api.ts
import { HttpMethod, type TApiDefinition, type TPage } from "../../types/base.types";
import type { TProductOfShop } from "../../types/product.types";
import { RESOURCES } from "../constants";


export const productsApi = {
  // PRIVATE SELLER PRODUCT CONTROLLER //

  // QUERY //

  listProducts: (): TApiDefinition<TPage<TProductOfShop>> => ({
    route: `${RESOURCES.PRODUCTS.PRIVATE}/list`,
    method: HttpMethod.GET,
  }),

  getProduct: (id: string): TApiDefinition<TProductOfShop> => ({
    route: `${RESOURCES.PRODUCTS.PRIVATE}/${id}`,
    method: HttpMethod.GET,
  }),
};