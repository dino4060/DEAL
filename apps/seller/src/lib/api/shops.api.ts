// src/api/shop.api.ts
import { HttpMethod, type TApiDefinition } from "../../types/base.types";
import type { TVerifyShopBody, TVerifyShopResult } from "../../types/shop.types";
import { RESOURCES } from "../constants";

export const shopsApi = {
  // PRIVATE SELLER SHOP CONTROLLER //

  // QUERY //

  // COMMAND //

  verifyShop: (body: TVerifyShopBody): TApiDefinition<TVerifyShopResult> => ({
    route: `${RESOURCES.SHOPS.PRIVATE}/verify`,
    method: HttpMethod.POST,
    body,
    withAuth: true,
  }),
};