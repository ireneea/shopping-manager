import {NextApiRequest, NextApiResponse} from "next";
import {RecipeModel, shoppingManagerStore} from "@store";
import {ApiError} from "@libs/api-utils";

export const findRecipeByIdHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<RecipeModel | ApiError>
) => {
    try {
        const recipeId = req.query.recipeId as string;
        const recipe = await shoppingManagerStore.recipe.findRecipeById(recipeId);
        if (recipe) {
            return res
                .status(200)
                .json(recipe);
        } else {
            return res
                .status(404)
                .json({error: `Recipe with id ${recipeId} not found`})
        }
    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }
}