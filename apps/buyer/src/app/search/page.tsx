import HomeContainer from "@/components/home/HomeContainer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { api } from "@/lib/api";
import { serverFetch } from "@/lib/fetch/fetch.server";
import { TProductSearchQuery } from "@/types/product.types";

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
        {query.keyword ? (
          <h2 className="text-xl font-medium">
            🔍 Search results for "<span className="text-primary">{query.keyword}</span>"
          </h2>
        ) : (
          <h2 className="text-xl font-medium">
            🔍 Search all
          </h2>
        )}
      </HomeContainer>

      <HomeContainer>
        <ProductGrid products={products} />
      </HomeContainer>
    </div>
  );
}

export default searchPage;