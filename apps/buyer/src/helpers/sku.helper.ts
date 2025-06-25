import { TSku, TSkuStatus } from "@/types/sku.types";

export const findMatchingSku = (skus: TSku[], tierOptionIndexes: (number | null)[]): TSku | undefined => {
  return skus.find(sku =>
    sku.tierOptionIndexes.every((val, idx) => val === tierOptionIndexes[idx])
  );
}

export const isActiveSku = (status: TSkuStatus) => {
  const live: TSkuStatus = 'LIVE';
  return status === live;
}