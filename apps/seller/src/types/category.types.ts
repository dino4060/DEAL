// types/category.types.ts
import type { TMainType } from "./base.types";

// MAIN TYPES //

export type TCategorySpecification = TMainType & {
  name: string;
  options: string[];
};

export type TCategory = TMainType & {
  name: string;
  slug: string;
  photo: string;
  description: string;
  position: number;
  level: number;
  parentCategory: TCategory | null;
  childCategories: TCategory[];
  specifications: TCategorySpecification[];
};

export type TCategoryBranch = TMainType & {
  level1Category: TCategory;
  level2Category: TCategory;
  level3Category: TCategory | null;
}

// SIDE TYPES //

export type TCategoryLean = Pick<TCategory,
  'id' | 'name' | 'slug' | 'photo'>;

export type TCategoryBranchLean = {
  id: number;
  level1Category: TCategoryLean;
  level2Category: TCategoryLean;
  level3Category: TCategoryLean | null;
};

export type TCategoryInList = Pick<TCategory,
  'id' | 'name' | 'photo' | 'position' | 'childCategories'>
