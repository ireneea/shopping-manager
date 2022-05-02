import {RecipeModel} from "@store";

import {DEFAULT_HTTP_HEADER} from "./default-http-header";
import {BASE_URL} from "./base-url"

export const createRecipe = async (recipeName: string) => {
    const response = await fetch(`${BASE_URL}/recipes`, {
        method: "POST",
        body: JSON.stringify({name: recipeName}),
        ...DEFAULT_HTTP_HEADER
    });

    if (response.status < 300) {
        return await response.json() as RecipeModel;
    }
}