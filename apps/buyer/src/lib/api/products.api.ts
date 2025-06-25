import { TApiDefinition, TPageRes } from "@/types/base.types";
import { TProduct, TProductItem, TProductSearchQuery } from "@/types/product.types";
import { HttpMethod, RESOURCES } from "../constants";

export const productsApi = {
  // PUBLIC //

  // QUERY //
  list: (): TApiDefinition<TPageRes<TProductItem>> => ({
    route: `${RESOURCES.PRODUCTS.PUBLIC}/list`,
    method: HttpMethod.GET,
  }),
  search: (query: TProductSearchQuery): TApiDefinition<TProductItem[]> => ({
    route: `${RESOURCES.PRODUCTS.PUBLIC}/search`,
    method: HttpMethod.GET,
    query
  }),
  getById: (productId: string): TApiDefinition<TProduct> => ({
    route: `${RESOURCES.PRODUCTS.PUBLIC}/${productId}`,
    method: HttpMethod.GET,
  })
}