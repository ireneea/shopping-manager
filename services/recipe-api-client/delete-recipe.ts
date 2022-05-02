import {DeleteRecipeResponse} from "@services/recipe-api";

import {DEFAULT_HTTP_HEADER} from "@services/recipe-api-client/default-http-header";
import {BASE_URL} from "./base-url"

export const deleteRecipe = async (recipeId: string) => {
    const response = await fetch(`${BASE_URL}/recipes/${recipeId}`, {
        method: "DELETE",
        ...DEFAULT_HTTP_HEADER
    });

    if (response.status < 300) {
        return await response.json() as DeleteRecipeResponse;
    }
}