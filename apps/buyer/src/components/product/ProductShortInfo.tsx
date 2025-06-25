'use client';
import { getPriceStrategy } from "@/helpers/product.helper";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { TSkuPrice } from "@/types/price.types";
import { TProductShortInfo } from "@/types/product.types";
import { TSku } from "@/types/sku.types";
import { TicketCheckIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

type TProductShortInfoProps = {
  product: TProductShortInfo;
  selectedSku: TSku | undefined;
}
export const ProductShortInfo = ({ product, selectedSku }: TProductShortInfoProps) => {
  const { shop, price: productPrice } = product;
  const skuPriceShared: TSkuPrice = { ...productPrice, id: 0 };
  const { isRetail: isRetailShared, isSinglePrice: isSinglePriceShared } =
    getPriceStrategy(productPrice);

  const [skuPrice, setSkuPrice] = useState(skuPriceShared);
  const [isRetail, setIsRetail] = useState(isRetailShared);
  const [isSinglePrice, setIsSinglePrice] = useState(isSinglePriceShared);

  useEffect(() => {
    const skuPrice = productPrice.skuPrices.find(skuPrice => skuPrice.id === selectedSku?.id) || skuPriceShared;
    const { isRetail: isRetailInNow, isSinglePrice: isSinglePriceInNow } = getPriceStrategy(skuPrice);

    setSkuPrice(skuPrice);
    (isRetail !== isRetailInNow) && setIsRetail(isRetailInNow);
    (isSinglePrice !== isSinglePriceInNow) && setIsSinglePrice(isSinglePriceInNow);
  }, [selectedSku]);

  return (
    <Fragment>
      {/* Product Name */}
      <div className='flex flex-col gap-1'>
        <h1 className="text-lg font-medium">{product.name}</h1>
        <div className="text-sm text-gray-500">⭐ 4.8 (55) | 🔥 2.3K sold | 🏠 by {shop.name}</div>
      </div>

      {/* Prices */}
      <div className='p-1 bg-gray-50 flex flex-col gap-1'>
        <div className='flex items-center text-3xl text-[var(--dino-red-1)] font-semibold tracking-tighter gap-0.5'>
          {formatCurrency(skuPrice.mainPrice, isSinglePrice)}
        </div>

        {!isRetail && (
          <Fragment>
            <div className='flex gap-1'>
              <div className='flex items-center text-sm text-gray-400 line-through'>
                {formatCurrency(skuPrice.sidePrice)}
              </div>

              <div className='inline-flex justify-center items-center text-xs text-red-500 bg-red-100 rounded-sm px-1.5 py-0.5 animate-pulse'>
                <TicketCheckIcon className='w-4 h-4 mx-0.5' />
                {formatPercent(skuPrice.discountPercent)}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}