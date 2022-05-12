import {NextApiRequest, NextApiResponse} from "next";
import {DeleteRecipeResponse} from "./delete-recipe.response";
import {ApiError} from "@libs/api-utils";
import {deleteRecipe} from "@store";

export const deleteRecipeHandler = async (req: NextApiRequest, res: NextApiResponse<DeleteRecipeResponse | ApiError>) => {
    try {
        const recipeId = req.query.recipeId as string;
        await deleteRecipe(recipeId );

        return res
            .status(200)
            .json({ deleted: recipeId});
    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }

}