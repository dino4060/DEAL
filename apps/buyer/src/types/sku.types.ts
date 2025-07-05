import { TInventory } from "./inventory.types";
import { TSkuPrice } from "./price.types";

// NESTED TYPES //

export type TSkuStatus = 'LIVE' | 'DEACTIVATED' | 'OUT_OF_STOCK';

// MAIN TYPES //

export type TSku = {
  id: number;
  status: TSkuStatus;
  code: string;
  tierOptionIndexes: number[];
  tierOptionValue: string;
  retailPrice: number;
  productionCost: number | null;
  inventory: TInventory;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

// SIDE TYPES //

export type TSkuLean = Pick<TSku,
  'id' | 'code' | 'tierOptionIndexes' | 'tierOptionValue'>;