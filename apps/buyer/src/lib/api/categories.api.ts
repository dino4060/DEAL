import { TCategoryItem } from "@/types/category.types";
import { TApiDefinition, HttpMethod } from "@/types/base.types";
import { RESOURCES } from "../constants";

export const categoriesApi = {
  // PUBLIC //

  // QUERY //
  getTree: (): TApiDefinition<TCategoryItem[]> => ({
    route: `${RESOURCES.CATEGORY.PUBLIC}/tree`,
    method: HttpMethod.GET,
  }),
}