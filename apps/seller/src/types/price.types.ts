// types/price.types.ts
import type { TMainType } from "./base.types";

// MAIN TYPES //

export type TSkuPrice = TMainType & {
  mainPrice: number;
  sidePrice: number | null;
  discountPercent: number;
}

export type TProductPrice = TMainType & {
  mainPrice: number;
  sidePrice: number | null;
  discountPercent: number;
  maxMainPrice: number | null;
  maxSidePrice: number | null;
  maxDiscountPercent: number | null;
  skuPrices: TSkuPrice[];
}