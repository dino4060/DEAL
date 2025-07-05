// src/components/checkout/CheckoutHydrator.tsx
"use client";
import { api } from '@/lib/api';
import { clientFetch } from '@/lib/fetch/fetch.client';
import { TStartCheckout } from '@/types/checkout.types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CheckoutSummary } from './CheckoutSummary';
import { DefaultAddress } from './DefaultAddress';
import { OrderList } from './OrderCard';
import { PaymentMethodSection } from './PaymentMethod';
import { PlatformVoucher } from './PlatformVoucher';
import { useAppDispatch } from '@/store/hooks';
import { actions } from '@/store';

export function CheckoutHydrator() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [startCheckoutData, setStartCheckoutData] = useState<TStartCheckout | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState<boolean>(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  // const [error, setError] = useState<string | null>(null);

  // Fetch to start checkout when component mounts
  useEffect(() => {
    async function fetchStartCheckout() {
      setLoadingCheckout(true);

      // If storedCartItemIds is nullish -> return cart page
      const storedCartItemIds = localStorage.getItem('checkoutCartItemIds');
      if (!storedCartItemIds) {
        toast.error("Không tìm thấy sản phẩm đã chọn 😭");
        router.push('/cart');
        return;
      }

      // If cartItemIds is empty -> return cart page
      const cartItemIds = JSON.parse(storedCartItemIds);
      if (cartItemIds.length === 0) {
        toast.error("Vui lòng chọn sản phẩm để thanh toán 😭");
        router.push('/cart');
        return;
      }

      // clientFetch to start checkout
      const { success, error, data } = await clientFetch(api.checkout.startCheckout({ cartItemIds }));
      if (success) {
        localStorage.removeItem('checkoutCartItemIds');
        setStartCheckoutData(data);
      } else {
        toast.error(error + ' 😭');
        // setError(error);
        router.push('/cart');
      }
      setLoadingCheckout(false);
    }

    fetchStartCheckout();
  }, [router]);

  const handleConfirmOrder = useCallback(async () => {
    if (!startCheckoutData) {
      toast.error("Dữ liệu đơn hàng chưa sẵn sàng 😭");
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán 😭");
      return;
    }

    // Fetch to confirmCheckout
    setLoadingCheckout(true);
    const orderIdsToConfirm = startCheckoutData.orders.map(order => order.id);
    const numberOfItemsToConfirm = startCheckoutData.orders.reduce(
      (total, order) => total + order.orderItems.length, 0
    );

    const { success, error, data } = await clientFetch(api.checkout.confirmCheckout({ orderIds: orderIdsToConfirm }));
    if (success && data.isConfirmed) {
      toast.success(`Đã xác nhận ${data.count} đơn hàng thành công 😍`);
      dispatch(actions.cart.plusTotal(-1 * numberOfItemsToConfirm))
      router.push('/');
      // TEMP: router.push('/orders/success');
    } else {
      toast.error(error + ' 😭');
    }
    setLoadingCheckout(false);

  }, [startCheckoutData, selectedPaymentMethod, router]);

  if (loadingCheckout) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-150px)]">
        <div className="text-center text-lg text-gray-600">
          Đang hoàn thành thanh toán...
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-150px)]">
  //       <div className="text-center text-lg text-red-600">
  //         Có lỗi xảy ra: {error}
  //       </div>
  //     </div>
  //   );
  // }

  if (!startCheckoutData) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-150px)]">
        <div className="text-center text-lg text-gray-600">
          Không có dữ liệu thanh toán. Vui lòng thử lại từ giỏ hàng.
        </div>
      </div>
    );
  }

  const totalFinalItems = startCheckoutData.orders.reduce((sum, order) => sum + order.orderItems.length, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Address, Orders, Payment Method */}
      <div className="flex-1 lg:w-2/3">
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <DefaultAddress />
            <OrderList orders={startCheckoutData.orders} />
            <PaymentMethodSection
              selectedPaymentMethod={selectedPaymentMethod}
              onPaymentMethodChange={setSelectedPaymentMethod}
            />
          </div>
        </div>
      </div>

      {/* Platform Voucher, Checkout Summary */}
      <div className="lg:w-1/3 flex flex-col gap-4 lg:sticky lg:top-4 lg:self-start">
        <PlatformVoucher />
        <CheckoutSummary
          totalCheckoutSnapshot={startCheckoutData.totalCheckoutSnapshot}
          handleConfirmOrder={handleConfirmOrder}
          loadingCheckout={loadingCheckout}
          selectedPaymentMethod={selectedPaymentMethod}
        />
      </div>
    </div>
  );
}