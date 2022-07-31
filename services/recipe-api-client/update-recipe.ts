import {DEFAULT_HTTP_HEADER} from "@services/recipe-api-client/default-http-header";
import {BASE_URL} from "./base-url";
import {RecipeModel, UpdateRecipeInput} from "@store";
import {HttpMethod} from "@libs/api-utils";

export const updateRecipe = async (input: UpdateRecipeInput) => {
    const response = await fetch(`${BASE_URL}/recipes/${input.recipeId}`, {
        method: HttpMethod.PATCH,
        ...DEFAULT_HTTP_HEADER,
        body: JSON.stringify(input),
    });

    if (response.status < 300) {
        return (await response.json()) as RecipeModel | null;
    }
};
