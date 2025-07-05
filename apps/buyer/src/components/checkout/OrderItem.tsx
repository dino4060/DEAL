// src/components/checkout/DraftOrderItem.tsx
"use client";
import Link from "next/link";
import { getFileUrl } from "@/lib/files";
import { RESOURCES } from "@/lib/constants";
import { TOrderItem } from "@/types/order.types";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface OrderItemProps { item: TOrderItem; }

export function OrderItem({ item }: OrderItemProps) {
  const productImageUrl = getFileUrl(item.product.thumb, RESOURCES.PRODUCTS.BASE, item.product.id);
  const itemSubtotal = item.mainPrice * item.quantity;
  const discountPercent = item.sidePrice ? Math.round((1 - item.mainPrice / item.sidePrice) * 100) : 0;

  return (
    <div className="grid grid-cols-order-item gap-3 items-center text-sm">
      {/* Sku Image & Name */}
      <div className="flex items-center gap-3">
        <Link href={`/product/${item.product.id}`} className="block flex-shrink-0">
          <img src={productImageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded cursor-pointer" />
        </Link>

        <div className="space-y-1">
          <Link href={`/product/${item.product.id}`}>
            <p className="text-[13px] text-gray-800 line-clamp-1 hover:text-blue-600 cursor-pointer">
              {item.product.name}
            </p>
          </Link>

          <p className="text-[13px] inline-flex justify-center items-center text-gray-600 bg-gray-100 rounded-[3px] p-1">
            SKU {item.sku.tierOptionValue}
          </p>
        </div>
      </div>

      {/* Unit Price */}
      <div className="text-center">
        <p className="font-medium text-gray-900">{formatCurrency(item.mainPrice)}</p>

        {item.sidePrice && item.sidePrice !== item.mainPrice && (
          <p className="text-xs text-gray-400 line-through">
            {formatCurrency(item.sidePrice)}
            <span className="ml-1 inline-flex justify-center items-center text-[11px] text-rose-500 bg-rose-100 rounded-sm p-0.5">
              {formatPercent(discountPercent)}
            </span>
          </p>
        )}
      </div>

      {/* Quantity */}
      <div className="text-center text-gray-500">
        SL {item.quantity}
      </div>

      {/* Item Price */}
      <div className="text-right font-semibold text-rose-500">
        {formatCurrency(itemSubtotal)}
      </div>
    </div>
  );
}