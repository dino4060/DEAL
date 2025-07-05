import HomeContainer from "@/components/home/HomeContainer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { api } from "@/lib/api";
import { serverFetch } from "@/lib/fetch/fetch.server";
import { TProductSearchQuery } from "@/types/product.types";
import { Fragment } from "react";

type TSearchPageProps = {
  searchParams: Promise<TProductSearchQuery>
}

async function searchPage({ searchParams }: TSearchPageProps) {
  const query = await searchParams;

  const { success, data } = await serverFetch(api.products.search(query));

  const products = success ? data : [];

  return (
    <div className="py-10 space-y-10">
      <HomeContainer>
        <h2 className="text-xl font-medium">
          {products.length ? (
            query.keyword ? (
              <Fragment>🔍 Kết quả tìm kiếm cho "<span className="text-primary">{query.keyword}</span>"</Fragment>
            ) : (
              <Fragment>🔍 Tìm kiếm tất cả</Fragment>
            )
          ) : (
            <Fragment>😭 Rất tiết, không tìm thấy sản phẩm thõa mãn</Fragment>
          )}
        </h2>
      </HomeContainer>

      <HomeContainer>
        <ProductGrid products={products} />
      </HomeContainer>
    </div>
  );
}

export default searchPage;