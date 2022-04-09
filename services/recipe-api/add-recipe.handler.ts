import {NextApiRequest, NextApiResponse} from "next";
import {RecipeModel} from "../../store/models/recipe.model";
import {ApiError} from "../../libs/api-utils";
import {addRecipe, AddRecipeInput} from "../../store/store-functions";

export const addRecipeHandler = async (req: NextApiRequest, res: NextApiResponse<RecipeModel | ApiError>) => {
    try {
        const input = req.body as AddRecipeInput;
        const recipe = await addRecipe(input);

        return res
            .status(200)
            .json(recipe);
    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }
}