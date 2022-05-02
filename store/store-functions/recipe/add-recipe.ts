import {randomUUID} from "crypto";

import {AddRecipeInput} from "./add-recipe.input";
import {RecipeModel} from "../../models/recipe.model";
import {getDb} from "../../db/get-db";

export const addRecipe = async (input: AddRecipeInput) => {
    const newRecipe: RecipeModel = {
        id: randomUUID(),
        ...input
    }

    const db = await getDb();
    db.data?.recipes.push(newRecipe);
    await db.write();

    return newRecipe;
}