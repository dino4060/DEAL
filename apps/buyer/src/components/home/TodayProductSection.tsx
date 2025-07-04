'use client';

import { useState } from "react";
import CategoryListSection from "./CategoryListSection";
import { ProductGridSection } from "./ProductGirdSection";

const TodayProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <CategoryListSection
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