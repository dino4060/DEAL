import { TInventory } from "./inventory.types";

// NESTED TYPES //

export type TSkuStatus = 'LIVE' | 'DEACTIVATED' | 'OUT_OF_STOCK';

// MAIN TYPES //

export type TSku = {
  id: number;
  inventory: TInventory;
  status: TSkuStatus;
  code: string;
  tierOptionIndexes: number[];
  tierOptionValue: string;
  retailPrice: number;
  productionCost: number | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

// SIDE TYPES //

export type TSkuLean = Pick<TSku,
  'id' | 'code' | 'tierOptionIndexes' | 'tierOptionValue'>;