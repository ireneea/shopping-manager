import {getDb} from "../../db/get-db";
import {RecipeModel, UpdateRecipeInput} from "@store";

export const updateRecipe = async (input: UpdateRecipeInput) => {
    const db = await getDb();

    let recipe: RecipeModel | null = null;

    if (db.data?.recipes) {
        const recipeIndex = db.data.recipes.findIndex((recipe) => recipe.id === input.recipeId);

        if (recipeIndex > -1) {
            recipe = {
                ...db.data.recipes[recipeIndex],
                name: input.name,
                labels: input.labels
            };

            db.data.recipes = [
                ...db.data.recipes.slice(0, recipeIndex),
                recipe,
                ...db.data.recipes.slice(recipeIndex + 1),
            ];
            await db.write();
        }
    }

    return recipe;
}