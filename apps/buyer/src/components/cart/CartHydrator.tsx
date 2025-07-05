// src/components/cart/CartHydrator.tsx
"use client";
import { api } from "@/lib/api";
import { clientFetch } from "@/lib/fetch/fetch.client";
import { actions } from "@/store";
import { TAddress } from "@/types/address.types";
import { TCart } from "@/types/cart.types";
import { TEstimateCheckout } from "@/types/checkout.types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { CartDisplay } from "./CartDisplay";
import { CartSummary } from "./CartSummary";
import { DefaultAddress } from "./DefaultAddress";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface CartHydratorProps {
  initialCart: TCart;
  initialDefaultAddress: TAddress | null;
}

export function CartHydrator({ initialCart, initialDefaultAddress }: CartHydratorProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartVersion = useAppSelector(state => state.cart.version)
  const [cartData, setCartData] = useState<TCart>(initialCart);
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<Set<number>>(new Set());
  const [estimateData, setEstimateData] = useState<TEstimateCheckout | null>(null);

  useEffect(() => {
    dispatch(actions.cart.setCart(initialCart));
  }, []);

  // Lấy tất cả các ID của item trong giỏ hàng (dùng useMemo để tối ưu)
  const allCartItemIds = useMemo(() => {
    const ids = new Set<number>();
    initialCart.cartGroups.forEach(group => {
      group.cartItems.forEach(item => ids.add(item.id));
    });
    return ids;
  }, [initialCart]);

  // handleCheckAll
  const handleCheckAll = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedCartItemIds(new Set(allCartItemIds));
    } else {
      setSelectedCartItemIds(new Set());
    }
  }, [allCartItemIds]);

  // handleCheckGroup
  const handleCheckGroup = useCallback((groupId: number, checked: boolean) => {
    const newSelectedIds = new Set(selectedCartItemIds);
    const groupItems = initialCart.cartGroups.find(g => g.id === groupId)?.cartItems || [];

    if (checked) {
      groupItems.forEach(item => newSelectedIds.add(item.id));
    } else {
      groupItems.forEach(item => newSelectedIds.delete(item.id));
    }
    setSelectedCartItemIds(newSelectedIds);
  }, [selectedCartItemIds, initialCart]);

  // handleCheckItem
  const handleCheckItem = useCallback((itemId: number, checked: boolean) => {
    const newSelectedIds = new Set(selectedCartItemIds);
    if (checked) {
      newSelectedIds.add(itemId);
    } else {
      newSelectedIds.delete(itemId);
    }
    setSelectedCartItemIds(newSelectedIds);
  }, [selectedCartItemIds]);

  // handleQuantityUpdateOptimistic
  const handleQuantityUpdateOptimistic = useCallback(async (cartItemId: number, newQuantity: number) => {
    const previousCartData = cartData;
    const originalQuantity = cartData.cartGroups.flatMap(g => g.cartItems).find(item => item.id === cartItemId)?.quantity || 0;

    // 1. update cart optimistically
    setCartData(prevCart => {
      if (!prevCart) return prevCart;

      const newCartGroups = prevCart.cartGroups.map(group => ({
        ...group,
        cartItems: group.cartItems
          .map(item => item.id === cartItemId ? { ...item, quantity: newQuantity } : item
          )
      }));

      return { ...prevCart, cartGroups: newCartGroups };
    });

    // 2. trigger to re-estimate checkout
    const isUpdatedSelected = selectedCartItemIds.has(cartItemId);
    isUpdatedSelected && dispatch(actions.cart.updateVersion());

    // 3. fetch to updateQuantity
    const { success, error } = await clientFetch(api.carts.updateQuantity({ cartItemId, quantity: newQuantity }));

    if (success) {
      toast.success("Cập nhật số lượng thành công 😍");
    } else {
      toast.error(error + ' 😭');
      setCartData(previousCartData);
      isUpdatedSelected && dispatch(actions.cart.updateVersion());
    }
  }, [cartData]);

  // handleRemoveItemsOptimistically
  const handleRemoveItemsOptimistically = useCallback(async (cartItemIdsToRemove: number[]) => {
    const prevCartData = cartData;
    const prevSelectedCartItemIds = new Set(selectedCartItemIds);

    // 1. remove cart optimistically
    setCartData(prevCart => {
      if (!prevCart) return prevCart;

      const newCartGroups = prevCart.cartGroups.map(group => ({
        ...group,
        cartItems: group.cartItems.filter(item => !cartItemIdsToRemove.includes(item.id))
      })).filter(group => group.cartItems.length > 0);

      return { ...prevCart, cartGroups: newCartGroups };
    });

    // 2. trigger to update selectedCartItemIds && re-estimate checkout
    const currentSelected = new Set(selectedCartItemIds);
    cartItemIdsToRemove.forEach(id => currentSelected.delete(id));
    const isRemovedSelected = currentSelected.size !== selectedCartItemIds.size;

    if (isRemovedSelected) {
      setSelectedCartItemIds(currentSelected);
      dispatch(actions.cart.updateVersion());
    }

    // 3. fetch to removeCartItems
    const { success, error, data } = await clientFetch(api.carts.removeCartItems({ cartItemIds: cartItemIdsToRemove }));

    if (success && data.isDeleted) {
      dispatch(actions.cart.plusTotal(-1 * data.count));
      toast.success(`Đã xóa ${data.count} sản phẩm thành công 😍`);
    } else {
      setCartData(prevCartData);
      isRemovedSelected && dispatch(actions.cart.updateVersion());
      toast.error(error + ' 😭');
    }
  }, [cartData, selectedCartItemIds]);

  // Hàm để refresh dữ liệu giỏ hàng sau khi clientFetch thành công
  const refreshCartData = useCallback(() => {
    router.refresh();
  }, [router]);

  // Effect để gọi API estimateCheckout mỗi khi selectedCartItemIds thay đổi
  useEffect(() => {
    const fetchEstimate = async () => {
      if (selectedCartItemIds.size === 0) {
        setEstimateData(null);
        return;
      }

      const itemIdsArray = Array.from(selectedCartItemIds);
      const result = await clientFetch(api.checkout.estimateCheckout({ cartItemIds: itemIdsArray }));

      if (result.success && result.data) {
        setEstimateData(result.data);
      } else {
        console.error(result.error + ' 😭');
        setEstimateData(null);
      }
    };

    // Debounce để tránh gọi API quá nhiều khi chọn nhanh
    const debounceTimer = setTimeout(() => {
      fetchEstimate();
    }, 300);

    return () => clearTimeout(debounceTimer); // Clear timer
  }, [selectedCartItemIds, cartVersion]);

  // TODO: remove try catch fetch checkout
  const handleCheckout = useCallback(() => {
    if (selectedCartItemIds.size === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }
    try {
      localStorage.setItem('checkoutCartItemIds', JSON.stringify(Array.from(selectedCartItemIds)));
      router.push('/checkout');
    } catch (error) {
      console.error("Failed to save selected cart item IDs to localStorage:", error);
      toast.error("Có lỗi xảy ra khi chuẩn bị thanh toán. Vui lòng thử lại.");
    }
  }, [selectedCartItemIds, router]);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Left area: Display Cart */}
      <div className="flex-1 lg:w-2/3">
        <CartDisplay
          cart={cartData}
          selectedCartItemIds={selectedCartItemIds}
          onCheckAll={handleCheckAll}
          onCheckGroup={handleCheckGroup}
          onCheckItem={handleCheckItem}
          onRemoveItem={(cartItemId) => handleRemoveItemsOptimistically([cartItemId])}
          onQuantityUpdate={handleQuantityUpdateOptimistic}
          onQuantityUpdateSuccess={refreshCartData}
          onRemoveItemSuccess={refreshCartData}
        />
      </div>

      {/* Right area: Default address + Cart summary */}
      <div className="lg:w-1/3 flex flex-col gap-4 lg:sticky lg:top-4 lg:self-start">
        <DefaultAddress
          defaultAddress={initialDefaultAddress} />

        <CartSummary
          selectedCartItemIds={selectedCartItemIds}
          estimateData={estimateData}
          onCheckout={handleCheckout} />
      </div>
    </div>
  );
}