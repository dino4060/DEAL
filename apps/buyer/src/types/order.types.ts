// src/types/order.types.ts
import { TCheckoutSnapshot } from "@/types/checkout.types";
import { TProductLean } from "@/types/product.types";
import { TSkuLean } from "@/types/sku.types";
import { TShopLean } from "@/types/shop.types";

// NESTED TYPES //

export type TOrderStatus =
  "DRAFT" | "UNPAID" | "PENDING" |
  "PREPARING" | "TRANSIT" | "DELIVERING" |
  "DELIVERED" | "RETURN" | "CANCELED";

export type TPaymentMethod =
  "COD" | "MOMO" | "ZALO_PAY" | "VN_PAY" | "GOOGLE_PAY";

export type TShippingDetail = {
  carrier: string;
  minEstimatedDelivery: Date;
  maxEstimatedDelivery: Date;
};

// MAIN TYPES //

export type TOrderItem = {
  id: number;
  photo: string;
  quantity: number;
  mainPrice: number;
  sidePrice: number | null;
  product: TProductLean;
  sku: TSkuLean;
};

export type TOrder = {
  id: number;
  status: TOrderStatus;
  shop: TShopLean;
  note: string;
  checkoutSnapshot: TCheckoutSnapshot;
  shippingDetail: TShippingDetail;
  orderItems: TOrderItem[];
};

// PICK TYPES //

export type TDraftOrder = Pick<TOrder,
  'id' | 'status' | 'shop' | 'note' | 'checkoutSnapshot' | 'shippingDetail' | 'orderItems'>;