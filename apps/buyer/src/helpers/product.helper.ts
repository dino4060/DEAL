// helpers/product.helper.ts
import { TProductPrice, TSkuPrice } from "@/types/price.types";
import { TProductSelector } from "@/types/product.types";
import { isActiveSku } from "./sku.helper";

type TPriceStrategy = {
  isRetail: boolean;
  isSinglePrice: boolean;
}

export const getPriceStrategy = (price: TProductPrice | TSkuPrice): TPriceStrategy => {
  if ('skuPrices' in price) {
    const { mainPrice, maxMainPrice, discountPercent } = price;

    const isRetail: boolean = discountPercent === 0;
    const isSinglePrice: boolean = mainPrice === maxMainPrice;

    return { isRetail, isSinglePrice };
  } else {
    const { discountPercent } = price;

    const isRetail: boolean = discountPercent === 0;
    const isSinglePrice: boolean = true;

    return { isRetail, isSinglePrice };
  }
}

export const getDisabledOptionsMatrix2 = (product: TProductSelector, selectedOptionIdxsInTier: (number | null)[]): boolean[][] => {
  const disabledMatrix: boolean[][] = product.tierVariations.map(tier =>
    tier.options.map(() => false)
  );

  const skus = product.skus;

  const isOptionDisabled = (tierIndex: number, optionIndex: number): boolean => {
    return skus
      .filter(sku => sku.tierOptionIndexes[tierIndex] === optionIndex)
      .every(sku => !isActiveSku(sku.status));
  };

  product.tierVariations.forEach((tier, tierIndex) => {
    tier.options.forEach((_, optionIndex) => {
      // With 2-tier variation, need to get both all them
      const otherTierIdx = 1 - tierIndex;
      const selectedInOtherTier = selectedOptionIdxsInTier[otherTierIdx];

      // If client select a option
      if (selectedInOtherTier === null) {
        disabledMatrix[tierIndex][optionIndex] = isOptionDisabled(tierIndex, optionIndex);
      }
      // If client select 2 options
      else {
        const matchedSkus = skus.filter(
          sku =>
            sku.tierOptionIndexes[tierIndex] === optionIndex &&
            sku.tierOptionIndexes[otherTierIdx] === selectedInOtherTier
        );
        const allOutOfStock = matchedSkus.every(sku => sku.inventory.stocks === 0);
        disabledMatrix[tierIndex][optionIndex] = allOutOfStock;
      }
    });
  });

  return disabledMatrix;
};

export const getDisabledOptionsMatrix = (
  product: TProductSelector,
  selected: (number | null)[]
): boolean[][] => {

  const disabledMatrix: boolean[][] = product.tierVariations.map(tier =>
    tier.options.map(() => false)
  );

  const skus = product.skus;

  const isOptionDisabled = (tierIndex: number, optionIndex: number): boolean => {
    return skus
      .filter(sku => sku.tierOptionIndexes[tierIndex] === optionIndex)
      .every(sku => !isActiveSku(sku.status));
  };

  product.tierVariations.forEach((tier, tierIndex) => {
    tier.options.forEach((_, optionIndex) => {
      const otherTierIndex = 1 - tierIndex;
      const selectedInOtherTier = selected[otherTierIndex];

      if (selectedInOtherTier === null) {
        disabledMatrix[tierIndex][optionIndex] = isOptionDisabled(tierIndex, optionIndex);
      } else {
        const matchedSkus = skus.filter(
          sku =>
            sku.tierOptionIndexes[tierIndex] === optionIndex &&
            sku.tierOptionIndexes[otherTierIndex] === selectedInOtherTier
        );
        const allOutOfStock = matchedSkus.every(sku => sku.inventory.stocks === 0);
        disabledMatrix[tierIndex][optionIndex] = allOutOfStock;
      }
    });
  });

  return disabledMatrix;
};
