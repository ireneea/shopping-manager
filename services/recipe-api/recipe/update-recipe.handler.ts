import {NextApiRequest, NextApiResponse} from "next";
import {ApiError} from "@libs/api-utils";
import {RecipeModel, shoppingManagerStore, UpdateRecipeInput} from "@store";

export const updateRecipeHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<RecipeModel | null | ApiError>
) => {
  try {
    const input = req.body as UpdateRecipeInput;
    const updatedRecipe = await shoppingManagerStore.recipe.updateRecipe(input)
    return res.status(updatedRecipe ? 200 : 204).json(updatedRecipe);
  } catch (err) {
    return res
        .status(500)
        .json({error: (err as any).message || "Unexpected error"});
  }
};
