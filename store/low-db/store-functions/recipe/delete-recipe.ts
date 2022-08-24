import {getDb} from "../../db/get-db";

export const deleteRecipe = async (recipeId: string) => {
  const db = await getDb();

  let deleted = null;

  if (db.data?.recipes) {
    const recipeIndex = db.data.recipes.findIndex((recipe) => recipe.id === recipeId);

    if (recipeIndex > -1) {
      deleted = {...db.data.recipes[recipeIndex]};
      db.data?.recipes.splice(recipeIndex, 1);
      await db.write();
    }
  }

  return deleted;
};
