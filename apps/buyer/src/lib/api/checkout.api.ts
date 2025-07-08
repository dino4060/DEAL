// src/lib/api/checkout.api.ts
import { TApiDefinition, HttpMethod } from "@/types/base.types";
import { RESOURCES } from "../constants";
import { TEstimateCheckoutBody, TEstimateCheckout, TStartCheckoutBody, TStartCheckout, TConfirmCheckoutBody, TConfirmCheckout } from "@/types/checkout.types";

export const checkoutApi = {
  // PUBLIC //

  // PRIVATE //

  // QUERY //

  estimateCheckout: (body: TEstimateCheckoutBody): TApiDefinition<TEstimateCheckout> => ({
    route: `${RESOURCES.CHECKOUT.PRIVATE}/estimate`,
    method: HttpMethod.POST,
    body,
    withAuth: true,
  }),

  // COMMAND //

  startCheckout: (body: TStartCheckoutBody): TApiDefinition<TStartCheckout> => ({
    route: `${RESOURCES.CHECKOUT.PRIVATE}/start`,
    method: HttpMethod.POST,
    body,
    withAuth: true,
  }),

  confirmCheckout: (body: TConfirmCheckoutBody): TApiDefinition<TConfirmCheckout> => ({
    route: `${RESOURCES.CHECKOUT.PRIVATE}/confirm`,
    method: HttpMethod.PATCH,
    body,
    withAuth: true,
  }),
};
