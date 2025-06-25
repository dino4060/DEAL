'use client';
import { useAppSelector } from "@/store/hooks";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Cart = () => {
  const total = useAppSelector(state => state.cart.cart?.total)
  console.log('>>> Cart: ', total);

  return (
    <Link
      href={'/cart'}
      className='relative'
    >
      <ShoppingCart />
      {(total != null) && <span className='
        absolute -top-2 -right-4 w-6 h-4 rounded-full bg-[var(--dino-red-1)]
        text-white text-xs font-semibold flex items-center justify-center'
      >
        {total}
      </span>}

    </Link>
  );
};