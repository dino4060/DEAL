// src/types/cart.types.ts
import { TSkuPrice } from "./price.types";
import { TProductLean } from "./product.types";
import { TShopLean } from "./shop.types";
import { TSkuLean } from "./sku.types";

// MAIN TYPES //

export type TCartItem = {
  id: number
  quantity: number;
  photo: string;
  product: TProductLean;
  sku: TSkuLean;
  price: TSkuPrice;
};

export type TCartGroup = {
  id: number;
  shop: TShopLean;
  cartItems: TCartItem[];
};

export type TCart = {
  id: number;
  total: number;
  cartGroups: TCartGroup[];
};

export type TAddCartItemBody = {
  skuId: number;
  quantity: number;
};

export type TUpdateQuantityBody = {
  cartItemId: number;
  quantity: number;
};

export type TRemoveCartItemBody = {
  cartItemIds: number[];
};