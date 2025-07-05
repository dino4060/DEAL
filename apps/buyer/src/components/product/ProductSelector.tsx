'use client';
import { getDisabledOptionsMatrix } from '@/helpers/product.helper';
import { findMatchingSku } from '@/helpers/sku.helper';
import { RESOURCES } from '@/lib/constants';
import { getFileUrl } from '@/lib/files';
import { TProductSelector } from '@/types/product.types';
import { TSku } from '@/types/sku.types';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

type TProductSelectorProps = {
  onSelectPhoto: (img: string) => void;
  setSelectedSku: (sku: TSku | undefined) => void;
  setQuantity: Dispatch<SetStateAction<number>>;
  product: TProductSelector;
  quantity: number;
};

export const ProductSelector = ({ onSelectPhoto, setSelectedSku, setQuantity, product, quantity }: TProductSelectorProps) => {

  const [selectedTierOptionIndexes, setSelectedTierOptionIndexes] = useState<(number | null)[]>(
    () => new Array(product.tierVariations.length).fill(null)
  );

  const disabledMatrix = useMemo(
    () => getDisabledOptionsMatrix(product, selectedTierOptionIndexes),
    [product, selectedTierOptionIndexes]
  );

  const selectedSku = useMemo(() => {
    if (selectedTierOptionIndexes.includes(null)) return undefined;
    return findMatchingSku(product.skus, selectedTierOptionIndexes);
  }, [product.skus, selectedTierOptionIndexes]);

  useEffect(() => {
    setSelectedSku(selectedSku);
  }, [selectedSku, setSelectedSku]);

  const onChangeQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const onSelectTierOption = (tierIdx: number, optIdx: number) => {
    setSelectedTierOptionIndexes(prev => {
      const next = [...prev];

      if (next[tierIdx] === optIdx) {
        next[tierIdx] = null; // unselect
      } else {
        next[tierIdx] = optIdx; // select
      }
      return next;
    });
  };

  return (
    <div className="space-y-4 text-sm">
      {/* Tier variations */}
      {product.tierVariations.map((tier, tierIdx) => (
        <div key={tier.name} className="space-y-2">
          <div className="font-medium">{tier.name}</div>
          <div className="flex flex-wrap gap-2">
            {tier.options.map((option, optionIdx) => {
              const photo = option.photo;
              const isDisabled = disabledMatrix[tierIdx][optionIdx];
              const isSelected = !isDisabled &&
                optionIdx === selectedTierOptionIndexes[tierIdx];

              return (
                <button
                  key={option.value}
                  disabled={isDisabled}
                  onClick={() => {
                    if (!isDisabled) {
                      onSelectTierOption(tierIdx, optionIdx);
                      option.photo && onSelectPhoto(option.photo);
                    }
                  }}
                  className={`
                      flex items-center justify-center border-2 rounded-sm
                      ${isSelected
                      ? 'border-[var(--dino-red-1)] bg-[var(--dino-red-1)] text-white'
                      : 'border-gray-300'}
                      ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}
                  `}
                >
                  {photo && (<div className="w-8 aspect-square relative">
                    <Image
                      src={getFileUrl(photo, RESOURCES.PRODUCTS.BASE, product.id)}
                      alt={photo}
                      fill
                      sizes="32px"
                      className="object-cover rounded-sm"
                    />
                  </div>)}
                  <div className='py-1.5 px-2'>{option.value}</div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity and Stocks */}
      <div className="flex items-center gap-4">
        <div className="font-medium">Số lượng</div>
        <div className="flex items-center border-2 border-gray-300 rounded-md overflow-hidden w-fit">
          <button
            onClick={() => onChangeQuantity(-1)}
            className="px-3 py-1 text-xl"
          >-</button>
          {/* TODO: type number to enter quantity */}
          <div className="w-10 py-1 border-l border-r border-gray-300 text-center font-semibold">
            {quantity}
          </div>
          <button
            onClick={() => onChangeQuantity(1)}
            className="px-3 py-1 text-xl"
          >+</button>
        </div>

        {selectedSku && (<div className="text-gray-500">
          Còn lại {selectedSku.inventory.stocks} sản phẩm
        </div>)}
      </div>
    </div>)
}
