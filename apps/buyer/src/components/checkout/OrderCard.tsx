// src/components/checkout/DraftOrderCard.tsx
"use client";
import { formatCurrency } from "@/lib/utils";
import { TDraftOrder } from "@/types/order.types";
import { StickyNoteIcon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { OrderItem } from "./OrderItem";
import { ShippingInfo } from "./ShippingInfo";
import { ShopVoucher } from "./ShopVoucher";

// Order List //
interface OrderListProps { orders: TDraftOrder[]; }

export function OrderList({ orders }: OrderListProps) {
  return (
    <section className="space-y-4">
      {orders.map((order, index) => (
        <Order key={order.id || index} order={order} />
      ))}
    </section>
  );
}

// Order //
interface OrderProps { order: TDraftOrder; }

export function Order({ order }: OrderProps) {
  return (
    <div className="bg-white p-4 border border-gray-200 space-y-3">
      {/* Shop Name */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <Link
          href={`/shops/${order.shop.id}`}
          className="flex items-center hover:text-blue-600 font-medium text-base gap-2"
        >
          <StoreIcon className="w-4 h-4" />{order.shop.name}
        </Link>

        <Button variant="link" className="p-0 has-[>svg]:px-0 h-auto text-gray-600 text-xs flex items-center gap-1">
          Ghi chú<StickyNoteIcon className="w-3 h-3" />
        </Button>
      </div>

      {/* Order Items */}
      <div className="space-y-2">
        {order.orderItems.map(item => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>

      {/* Shop Voucher */}
      <div className="py-1">
        <ShopVoucher />
      </div>

      {/* Shipping Info */}
      <div className="p-3 bg-emerald-50 rounded-[3px]">
        <ShippingInfo
          shippingDetail={order.shippingDetail}
          shippingFee={order.checkoutSnapshot.shippingFee}
        />
      </div>

      {/* Order Total */}
      <div className="">
        <div className="w-1/2 ml-auto flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            Tổng cộng ({order.orderItems.length} mặt hàng)
          </span>
          <span className="text-base font-bold text-gray-800">
            {formatCurrency(order.checkoutSnapshot.summary.total)}
          </span>
        </div>
      </div>
    </div>
  );
}