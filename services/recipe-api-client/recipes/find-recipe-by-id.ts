import {BASE_URL} from "@services/recipe-api-client/base-url";
import {DEFAULT_HTTP_HEADER} from "@services/recipe-api-client/default-http-header";
import {RecipeModel} from "@store";
import {HttpMethod} from "@libs/api-utils";

export const findRecipeById = async (recipeId: string) => {
    const response = await fetch(
        `${BASE_URL}/recipes/${recipeId}`,
        {
            method: HttpMethod.GET,
            ...DEFAULT_HTTP_HEADER,
        }
    );

    if (response.status < 300) {
        return (await response.json()) as RecipeModel;
    }
};
