// types/price.types.ts

import { TMainType } from "./base.types";

// MAIN TYPES //

export type TSkuPrice = TMainType & {
  id: number;
  mainPrice: number;
  sidePrice: number | null;
  discountPercent: number;
}

export type TProductPrice = TMainType & {
  id: number;
  mainPrice: number;
  sidePrice: number | null;
  discountPercent: number;
  maxMainPrice: number | null;
  maxSidePrice: number | null;
  maxDiscountPercent: number | null;
  skuPrices: TSkuPrice[];
}