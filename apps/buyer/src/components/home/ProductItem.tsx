"use client";
import { getPriceStrategy } from "@/helpers/product.helper";
import { RESOURCES } from "@/lib/constants";
import { getFileUrl } from "@/lib/files";
import { formatCurrency } from "@/lib/utils";
import { TProductItem } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

type TProductItemProps = {
  product: TProductItem;
};

export const ProductItem = ({ product }: TProductItemProps) => {
  const { id, name, thumb, meta, price } = product;

  const { isRetail, isSinglePrice } = getPriceStrategy(price);

  return (
    <Link href={`/product/${id}`}>
      <div className="w-full overflow-hidden rounded-lg bg-white shadow">
        {/* Product image */}
        <div className="relative aspect-square">
          <Image
            src={getFileUrl(thumb, RESOURCES.PRODUCTS.BASE, id)}
            alt="Product Image"
            fill={true}
            className="object-over"
            loading="lazy"
          />
        </div>

        <div className="p-2 space-y-1">
          {/* Product title */}
          <div className="text-sm text-gray-800 line-clamp-2 ">{name}</div>
          {/* Product price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg text-red-500 font-semibold ">
              {formatCurrency(price.mainPrice, isSinglePrice)}
            </span>

            {!isRetail && (
              <Fragment>
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(price.sidePrice)}
                </span>

                {/* <span className="text-sm text-gray-500 font-semibold">
                  {formatPercent(price.discountPercent)}
                </span> */}
              </Fragment>
            )}
          </div>

          {/* Free shipping */}
          <div className="text-xs font-semibold space-x-2">
            <span className="px-1 bg-teal-50 rounded-sm text-teal-500 border border-teal-100">
              Free shipping
            </span>
            {meta.isCodEnabled && (
              <span className="px-1 bg-white rounded-sm text-red-500 border border-red-500">
                COD
              </span>
            )}
          </div>
          {/* Stars and sales */}
          <div className="text-xs text-gray-400">⭐4.9 | 600 sold</div>
        </div>
      </div>
    </Link>
  );
};
