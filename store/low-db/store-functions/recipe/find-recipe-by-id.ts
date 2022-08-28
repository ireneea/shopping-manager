import {getDb} from "../../db/get-db";

export const findRecipeById = async (recipeId: string) => {
    const db = await getDb();

    const recipe = db.data?.recipes.find((recipe) => recipe.id === recipeId);
    return recipe ?? null
}