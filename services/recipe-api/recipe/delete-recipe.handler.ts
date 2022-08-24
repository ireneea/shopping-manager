import {NextApiRequest, NextApiResponse} from "next";
import {DeleteRecipeResponse} from "./delete-recipe.response";
import {ApiError} from "@libs/api-utils";
import {shoppingManagerStore} from "@store";

export const deleteRecipeHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<DeleteRecipeResponse | ApiError>
) => {
  try {
    const recipeId = req.query.recipeId as string;
    const deletedRecipe = await shoppingManagerStore.recipe.deleteRecipe(recipeId);
    return res.status(200).json({deleted: deletedRecipe ? deletedRecipe.id : null});
  } catch (err) {
    return res
      .status(500)
      .json({ error: (err as any).message || "Unexpected error" });
  }
};
