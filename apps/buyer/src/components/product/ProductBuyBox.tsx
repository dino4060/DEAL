'use client';
import { TProductBuyBox } from '@/types/product.types';
import { TSku } from '@/types/sku.types';
import { MessageCircleIcon, StoreIcon } from 'lucide-react';
import { useState } from 'react';
import { ProductSelector } from './ProductSelector';
import { ProductShortInfo } from './ProductShortInfo';
import { toast } from 'sonner';
import { clientFetch } from '@/lib/fetch/fetch.client';
import { api } from '@/lib/api';
import { useAppDispatch } from '@/store/hooks';
import { actions } from '@/store';

type TProductBuyBoxProps = {
  onSelectPhoto: (photo: string) => void;
  product: TProductBuyBox;
};

// select the first variant: ${selectedColor === code ? 'border-[var(--dino-red-1)] text-black' : 'border-gray-200'}
// hover variants: 'hover:border-black'
export const ProductBuyBox = ({ onSelectPhoto, product }: TProductBuyBoxProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSku, setSelectedSku] = useState<TSku | undefined>(undefined);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const addToCart = async () => {
    console.log(">>> addToCart: ");

    if (!selectedSku || !quantity) {
      toast.error("Vui lòng chọn mặt hàng 😊");
      return;
    }

    setAddingToCart(true);
    const { success, error, data: cartItem } = await clientFetch(api.carts.addCartItem({ skuId: selectedSku.id, quantity }));

    if (success) {
      cartItem.quantity === quantity && dispatch(actions.cart.plusTotal(1));
      toast.success("Đã thêm vào giỏ hàng thành công 🤩");
    } else {
      toast.error(error + " 😭");
    }
    setAddingToCart(false);
  }

  // REFERENCE: Max of Actions area is 100vh - header - breadcrumb - padding of ProductClientSide
  return (
    <div className='max-h-[calc(100vh-65px-33px-16px)] flex flex-col transition-all duration-300 sticky top-20 self-start divide-y divide-gray-200'>
      {/*  Name, Price, Variations, Quantity Summary */}
      <div className='overflow-y-auto scrollbar-hidden space-y-4 pb-4'>
        <ProductShortInfo
          product={{ ...product }}
          selectedSku={selectedSku}
        />

        <ProductSelector
          product={{ ...product }}
          quantity={quantity}
          setQuantity={setQuantity}
          setSelectedSku={setSelectedSku}
          onSelectPhoto={onSelectPhoto}
        />
      </div>

      {/* Shop, Chat, Cart, Buy Buttons */}
      <div className="flex items-center gap-4 sticky bottom-0 bg-white px-2 py-4 z-10">
        <div className="flex gap-4">
          <button className="flex flex-col items-center text-sm text-black">
            <StoreIcon className="w-5 h-5" />
            <span className='text-sm'>Shop</span>
          </button>

          <button className="relative flex flex-col items-center text-sm text-black">
            <MessageCircleIcon className="w-5 h-5" />
            <span>Chat</span>
            <span className="absolute -top-2 -right-1 bg-[var(--dino-red-1)] text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
              1
            </span>
          </button>
        </div>

        <div className="flex-1 flex gap-4">
          <button
            className="flex-1 py-1.5 bg-gray-100 text-black rounded-md font-medium text-base"
            onClick={addToCart}
          >
            {addingToCart ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
          </button>

          <button className="flex-1 py-1 bg-[var(--dino-red-1)] text-white rounded-md font-medium text-base flex flex-col items-center justify-start">
            <span>Mua ngay</span>
            <span className="text-xs font-normal">Free shipping</span>
          </button>
        </div>
      </div>
    </div >
  );
}