// types/inventory.types.ts
import type { TMainType } from "./base.types";

// MAIN TYPES //

export type TInventory = TMainType & {
  stocks: number;
  sales: number;
  total: number;
}