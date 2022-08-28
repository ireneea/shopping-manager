import {NextApiRequest, NextApiResponse} from "next";
import {AddRecipeInput, RecipeModel, shoppingManagerStore} from "@store";
import {ApiError} from "@libs/api-utils";

export const addRecipeHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<RecipeModel | ApiError>
) => {
  try {
    const input = req.body as AddRecipeInput;
    const recipe = await shoppingManagerStore.recipe.addRecipe(input);

    if (recipe) {
      return res.status(200).json(recipe);
    } else {
      return res
          .status(500)
          .json({error: "Unexpected error while creating recipe`"});
    }

  } catch (err) {
    return res
      .status(500)
      .json({ error: (err as any).message || "Unexpected error" });
  }
};
