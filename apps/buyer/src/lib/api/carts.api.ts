// src/api/carts.api.ts
import { TApiDefinition, HttpMethod, TDeletedRes } from "@/types/base.types";
import { RESOURCES } from "../constants";
import { TAddCartItemBody, TCart, TCartItem, TRemoveCartItemBody, TUpdateQuantityBody } from "@/types/cart.types";

export const cartsApi = {
  // PUBLIC //

  // PRIVATE //

  // QUERY //
  getCart: (): TApiDefinition<TCart> => ({
    route: `${RESOURCES.CARTS.PRIVATE}/get`,
    method: HttpMethod.GET,
    withAuth: true,
  }),
  // COMMAND //
  addCartItem: (body: TAddCartItemBody): TApiDefinition<TCartItem> => ({
    route: `${RESOURCES.CARTS.PRIVATE}/items/add`,
    method: HttpMethod.POST,
    body,
    withAuth: true,
  }),
  updateQuantity: (body: TUpdateQuantityBody): TApiDefinition<TCartItem> => ({
    route: `${RESOURCES.CARTS.PRIVATE}/items/quantity/update`,
    method: HttpMethod.PATCH,
    body,
    withAuth: true,
  }),
  removeCartItems: (body: TRemoveCartItemBody): TApiDefinition<TDeletedRes> => ({
    route: `${RESOURCES.CARTS.PRIVATE}/items/remove`,
    method: HttpMethod.DELETE,
    body,
    withAuth: true,
  }),
};