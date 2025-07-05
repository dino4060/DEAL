'use client';
import { useState } from "react";
import CategoryListSection from "./CategoryListSection";
import { ProductGridSection } from "./ProductGirdSection";
import { TCategoryItem } from "@/types/category.types";

type TTodayProductSectionProps = {
  categories: TCategoryItem[]
}

const TodayProductSection = ({ categories }: TTodayProductSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<TCategoryItem | undefined>(undefined);

  return (
    <>
      <CategoryListSection
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectCategory={setSelectedCategory}
      />

      <ProductGridSection
        selectedCategory={selectedCategory}
      />
    </>
  );
}

export default TodayProductSection;