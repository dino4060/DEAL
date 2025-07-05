// src/components/cart/CartSummary.tsx
"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { TEstimateCheckout } from "@/types/checkout.types";
import { useMemo } from "react";

interface CartSummaryProps {
  selectedCartItemIds: Set<number>;
  estimateData: TEstimateCheckout | null;
  onCheckout: () => void;
}

export function CartSummary({ selectedCartItemIds, estimateData, onCheckout }: CartSummaryProps) {

  const subtotalDisplay = useMemo(() => {
    return estimateData?.checkoutSnapshot.summary.itemsPrice || 0;
  }, [estimateData]);

  const savingsDisplay = useMemo(() => {
    return estimateData?.checkoutSnapshot.summary.savings || 0;
  }, [estimateData]);

  const finalTotalDisplay = useMemo(() => {
    return estimateData?.checkoutSnapshot.summary.total || 0;
  }, [estimateData]);

  // Đếm số lượng sản phẩm đã chọn
  const selectedItemCount = selectedCartItemIds.size;

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200">
      <h2 className="text-base font-medium mb-2">Tổng kết giỏ hàng</h2>

      {/* Accordion cho chi tiết */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="">
          <AccordionTrigger className="p-0 pb-4 mb-4 gap-1 hover:no-underline text-sm font-normal text-gray-900 rounded-none border-b border-gray-200">
            <div className="flex justify-between items-center text-gray-700 w-full">
              <span>Tổng phụ</span>
              <span className="font-medium">{formatCurrency(subtotalDisplay)}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="mb-4 space-y-4 text-sm border-b border-gray-200">
            {/* Voucher */}
            {estimateData?.checkoutSnapshot.discountVoucher &&
              estimateData?.checkoutSnapshot.discountVoucher.totalVoucher !== 0 && (
                <div className="">
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Voucher giảm giá</span>
                    <span className="">- {formatCurrency(estimateData?.checkoutSnapshot.discountVoucher.totalVoucher || 0)}</span>
                  </div>
                  <div className="text-gray-600 ml-4 space-y-2 mt-2">
                    {estimateData?.checkoutSnapshot.discountVoucher.sellerVoucher !== 0 && (
                      <div className="flex justify-between items-center text-gray-500">
                        <span>Voucher từ cửa hàng</span>
                        <span>- {formatCurrency(estimateData?.checkoutSnapshot.discountVoucher.sellerVoucher || 0)}</span>
                      </div>
                    )}
                    {estimateData?.checkoutSnapshot.discountVoucher.platformVoucher !== 0 && (
                      <div className="flex justify-between items-center text-gray-500">
                        <span>Voucher từ DEAL</span>
                        <span>- {formatCurrency(estimateData?.checkoutSnapshot.discountVoucher.platformVoucher || 0)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {/* Shipping Fee */}
            {estimateData?.checkoutSnapshot.shippingFee && (
              <div className="">
                <div className="flex justify-between items-center text-gray-700">
                  <span>Vận chuyển</span>
                  {estimateData.checkoutSnapshot.shippingFee.finalFee === 0 ? (
                    <span className="font-medium text-green-600">Freeship</span>
                  ) : (
                    <span className="font-medium">{formatCurrency(estimateData.checkoutSnapshot.shippingFee.finalFee)}</span>
                  )}
                </div>
                <div className="text-gray-600 ml-4 space-y-2 mt-2">
                  <div className="flex justify-between items-center text-gray-500">
                    <span>Phí vận chuyển ban đầu</span>
                    <span>{formatCurrency(estimateData.checkoutSnapshot.shippingFee.initialFee)}</span>
                  </div>
                  {estimateData.checkoutSnapshot.shippingFee.sellerShippingVoucher !== 0 && (
                    <div className="flex justify-between items-center text-gray-500">
                      <span>Cửa hàng giảm phí vận chuyển</span>
                      <span>- {formatCurrency(estimateData.checkoutSnapshot.shippingFee.sellerShippingVoucher || 0)}</span>
                    </div>
                  )}
                  {estimateData.checkoutSnapshot.shippingFee.platformShippingVoucher !== 0 && (
                    <div className="flex justify-between items-center text-gray-500">
                      <span>DEAL giảm phí vận chuyển</span>
                      <span>- {formatCurrency(estimateData.checkoutSnapshot.shippingFee.platformShippingVoucher || 0)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Tiết kiệm */}
      <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
        <span>Tiết kiệm</span>
        <span className="text-green-600 font-medium">- {formatCurrency(savingsDisplay)}</span>
      </div>

      {/* Tổng thanh toán */}
      <div className="flex justify-between items-center text-lg font-semibold mb-2">
        <span>Tổng thanh toán</span>
        <span className="text-[var(--dino-red-1)]">{formatCurrency(finalTotalDisplay)}</span>
      </div>

      <Button
        className="w-full bg-[var(--dino-red-1)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-4"
        disabled={selectedItemCount === 0}
        onClick={onCheckout}
      >
        Thanh toán ({selectedItemCount} chọn)
      </Button>
    </div>
  );
}
