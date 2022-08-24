import {randomUUID} from "crypto";

import {AddRecipeInput, RecipeModel} from "../../models";
import {getDb} from "../../db/get-db";

export const addRecipe = async (input: AddRecipeInput) => {
  const newRecipe: RecipeModel = {
    id: randomUUID(),
    ...input,
  };

  const db = await getDb();
  db.data?.recipes.push(newRecipe);
  await db.write();

  return newRecipe;
};
