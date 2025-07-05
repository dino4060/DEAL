'use client';
import { api } from "@/lib/api";
import { clientFetch } from "@/lib/fetch/fetch.client";
import { TPagination } from "@/types/base.types";
import { TProductItem } from "@/types/product.types";
import { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { ProductItem } from "../product/ProductItem";
import { toast } from "sonner";
import { TCategoryItem } from "@/types/category.types";

type TProductGridSectionProps = {
  selectedCategory: TCategoryItem | undefined;
}

export const ProductGridSection = ({ selectedCategory }: TProductGridSectionProps) => {
  const [products, setProducts] = useState<TProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);

  // const filteredProducts = !selectedCategory || selectedCategory === "All"
  //     ? allProducts
  //     : allProducts.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { success, error, data } = await clientFetch(api.products.list());
      setLoading(false);

      if (success) {
        setProducts(data.items);
        setPagination(data.pagination);
      }
      else {
        toast.error(error);
      }
    };

    fetchProducts();
  }, []); // run 1 time when the component mounts

  // px-2 sm:px-10 lg:px-20
  return (
    <HomeContainer>
      <div className="grid grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </HomeContainer>
  );
};