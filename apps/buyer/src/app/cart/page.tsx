// src/app/cart/page.tsx
import { CartHeader } from "@/components/cart/CartHeader";
import { CartHydrator } from "@/components/cart/CartHydrator";
import { getIsAuthenticated } from '@/functions/getIsAuthenticated';
import { getCachedUserCart, getDefaultAddress } from '@/functions/getStore';
import { redirect } from 'next/navigation';

export default async function CartPage() {
    const isAuthenticated = await getIsAuthenticated();

    // Nếu người dùng chưa đăng nhập, chuyển hướng về trang chủ hoặc trang đăng nhập
    if (!isAuthenticated) {
        redirect('/');
    }

    // Fetch dữ liệu cần thiết cho trang giỏ hàng trên server
    const [cart, defaultAddress] = await Promise.all([
        getCachedUserCart(),
        getDefaultAddress(),
    ]);

    // Nếu không có giỏ hàng hoặc giỏ hàng trống, hiển thị thông báo
    if (!cart || cart.cartGroups.length === 0) {
        return (
            <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-150px)]">
                <div className="text-center text-lg text-gray-600">
                    Giỏ hàng của bạn đang trống! Hãy thêm sản phẩm vào giỏ hàng nhé.
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-20 py-6">
            <CartHeader />

            <CartHydrator initialCart={cart} initialDefaultAddress={defaultAddress} />
        </div>
    );
}