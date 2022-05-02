import {getDb} from "../../db/get-db";

export const deleteRecipe = async (recipeId: string) => {
    const db = await getDb();

    let recipeIndex = -1;
    if(db.data?.recipes) {
        recipeIndex = db.data.recipes
            .findIndex((recipe) => recipe.id === recipeId);
    }

    if (recipeIndex > -1) {
        db.data?.recipes.splice(recipeIndex, 1);
        await db.write();
    }

}