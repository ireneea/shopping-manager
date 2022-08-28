import {NextApiRequest, NextApiResponse} from "next";
import {RecipeModel, shoppingManagerStore} from "@store";
import {ApiError} from "@libs/api-utils";

export const findAllRecipesHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<RecipeModel[] | ApiError>
) => {

    try {
        const recipes = await shoppingManagerStore.recipe.findAllRecipes()
        return res
            .status(200)
            .json(recipes);
    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }
}