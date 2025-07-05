'use client';
import { useAppSelector } from "@/store/hooks";

export function CartHeader() {
    const totalCartItems = useAppSelector(state => state.cart.total);

    return (
        <h1 className="text-2xl font-semibold mb-4 ml-4">
            Giỏ hàng của bạn
            {totalCartItems && (
                <span className="text-base text-gray-500 font-normal ml-2">({totalCartItems} sản phẩm)</span>
            )}
        </h1>
    )
}