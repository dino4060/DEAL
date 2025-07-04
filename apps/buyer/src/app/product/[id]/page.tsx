import { ProductHydrator } from '@/components/product/ProductHydrator';
import { api } from '@/lib/api';
import { serverFetch } from '@/lib/fetch/fetch.server';

type ProductDetailPageProps = {
  params: Promise<{ id: string; }>;
};

const ProductPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;

  const product = (await serverFetch(api.products.getById(id))).data;

  return (
    <ProductHydrator product={product} />
  );
};

export default ProductPage;