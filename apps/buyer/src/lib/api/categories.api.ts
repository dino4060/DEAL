import { TApiDefinition } from "@/types/base.types";
import { TCategoryItem } from "@/types/category.types";
import { HttpMethod, RESOURCES } from "../constants";

export const categoriesApi = {
  // PUBLIC //

  // QUERY //
  getTree: (): TApiDefinition<TCategoryItem[]> => ({
    route: `${RESOURCES.CATEGORY.PUBLIC}/tree`,
    method: HttpMethod.GET,
  }),
}