'use client';
import { ProductBreadcrumb } from '@/components/product/ProductBreadcrumb';
import { ProductBuyBox } from '@/components/product/ProductBuyBox';
import ProductDeals from '@/components/product/ProductDeals';
import { ProductDescription } from '@/components/product/ProductDescription';
import { ProductMedia } from '@/components/product/ProductMedia';
import { ProductShipping } from '@/components/product/ProductShipping';
import { ProductShopInfo } from '@/components/product/ProductShopInfo';
import { TProduct } from '@/types/product.types';
import { useState } from 'react';

type TProductHydratorProps = {
  product: TProduct;
}

export const ProductHydrator = ({ product }: TProductHydratorProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {
    id, name, tierVariations,
    thumb, photos, video, sizeGuidePhoto, description, specifications,
    categoryBranch, shop, price, skus
  } = product


  // px-2 sm:px-8 lg:px-35
  // REFERENCED: height = padding top = 16px
  return (
    <>
      <ProductBreadcrumb productName={name} categoryBranch={categoryBranch} />

      {/* Product Info */}
      <div className="px-2 sm:px-10 lg:px-35">
        <div className="container mx-auto">
          <div className="pt-4 pb-6 flex gap-10 relative">
            {/* Left Column */}
            <div className="w-8/15 space-y-6">
              <ProductMedia
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                product={{ id, thumb, photos, video, sizeGuidePhoto }} />

              <ProductShipping />

              <ProductDeals />

              <ProductShopInfo shop={shop} />

              <ProductDescription product={{ description, specifications }} />

              <div className="h-72 rounded-lg bg-green-400 flex items-center justify-center text-white font-bold text-xl">Coupons from DealShop</div>
              <div className="h-72 rounded-lg bg-amber-400 flex items-center justify-center text-white font-bold text-xl">Gift</div>
              <div className="h-72 rounded-lg bg-purple-400 flex items-center justify-center text-white font-bold text-xl">Bundles</div>
              <div className="h-72 rounded-lg bg-pink-400 flex items-center justify-center text-white font-bold text-xl">Reviews</div>
            </div>

            {/* Right Column */}
            <div className="w-7/15">
              <ProductBuyBox
                onSelectPhoto={setSelectedImage}
                product={{ id, name, shop, skus, tierVariations, price }}
              />
            </div>
          </div>

          {/* Recommendation */}
          <div className="mb-6 h-200 rounded-lg bg-sky-400 flex items-center justify-center text-white font-bold text-xl">Recommended Products</div>
        </div>
      </div>
    </>
  );
};