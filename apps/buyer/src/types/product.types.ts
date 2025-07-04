// types/product.types.ts
import { TMainType } from "./base.types";
import { TCategoryBranch } from "./category.types";
import { TProductPrice } from "./price.types";
import { TShop } from "./shop.types";
import { TSku } from "./sku.types";

// NESTED TYPES //

export type TProductStatus =
  'DRAFT' | 'REVIEWING' | 'LIVE' | 'DEACTIVATED' | 'SUSPENDED' | 'DELETED';

export type TProductSpecification = {
  name: string;
  value: string;
  link: string | null;
}

export type TProductTierVariation = {
  name: string;
  options: {
    value: string;
    photo: string | null;
  }[];
}

export type TProductMeta = {
  isCodEnabled: boolean;
}

// MAIN TYPES //

export type TProduct = TMainType & {
  id: number;
  status: TProductStatus;
  name: string;
  slug: string;
  retailPrice: number;
  thumb: string;
  photos: string[];
  sizeGuidePhoto: string | null;
  video: string | null;
  description: string | null;
  specifications: TProductSpecification[] | null;
  tierVariations: TProductTierVariation[];
  meta: TProductMeta;
  shop: TShop;
  categoryBranch: TCategoryBranch;
  price: TProductPrice;
  skus: TSku[];
}

// SIDE TYPES //

export type TProductItem = Pick<TProduct,
  'id' | 'name' | 'thumb' | 'meta' | 'price'>;

export type TProductBuyBox = Pick<TProduct,
  'id' | 'name' | 'shop' | 'skus' | 'tierVariations' | 'price'>;

export type TProductShortInfo = Pick<TProductBuyBox,
  'id' | 'name' | 'shop' | 'price'>;

export type TProductSelector = Pick<TProductBuyBox,
  'id' | 'skus' | 'tierVariations'>;

export type TProductBreadcrumb = Pick<TProduct,
  'id' | 'name' | 'categoryBranch'>;

export type TProductMedia = Pick<TProduct,
  'id' | 'thumb' | 'photos' | 'video' | 'sizeGuidePhoto'>;

export type TProductDescription = Pick<TProduct,
  'description' | 'specifications'>;

export type TProductLean = Pick<TProduct,
  'id' | 'name' | 'thumb'>;

// API TYPES //

export type TProductSearchQuery = {
  keyword: string | undefined;
}