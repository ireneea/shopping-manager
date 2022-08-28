import {DeleteRecipeResponse} from "@services/recipe-api";

import {DEFAULT_HTTP_HEADER} from "../default-http-header";
import {BASE_URL} from "../base-url";
import {HttpMethod} from "@libs/api-utils";

export const deleteRecipe = async (recipeId: string) => {
  const response = await fetch(`${BASE_URL}/recipes/${recipeId}`, {
    method: HttpMethod.DELETE,
    ...DEFAULT_HTTP_HEADER,
  });

  if (response.status < 300) {
    return (await response.json()) as DeleteRecipeResponse;
  }
};
