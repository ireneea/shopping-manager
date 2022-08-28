import {DEFAULT_HTTP_HEADER} from "../default-http-header";
import {BASE_URL} from "../base-url";
import {HttpMethod} from "@libs/api-utils";
import {RecipeModel} from "@store";

export const findAllRecipes = async () => {
    const response = await fetch(`${BASE_URL}/recipes`, {
        method: HttpMethod.GET,
        ...DEFAULT_HTTP_HEADER,
    });

    if (response.status < 300) {
        return (await response.json()) as RecipeModel[];
    }
};
