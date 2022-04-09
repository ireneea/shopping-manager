import {NextApiRequest, NextApiResponse} from "next";
import {DeleteRecipeResponse} from "./delete-recipe.response";
import {ApiError} from "../../libs/api-utils";

export const deleteRecipeHandler = async (req: NextApiRequest, res: NextApiResponse<DeleteRecipeResponse | ApiError>) => {
    try {
        return res
            .status(500)
            .json({error: "Action not available"});
    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }
}