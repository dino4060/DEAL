import { TProductItem } from "@/types/product.types";
import { ProductItem } from "./ProductItem";

type TProductGridProps = {
  products: TProductItem[];
}

export const ProductGrid = ({ products }: TProductGridProps) => {

  return (
    <div className="grid grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};