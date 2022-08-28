import {NextApiRequest, NextApiResponse} from "next";
import {RecipeLabelModel, shoppingManagerStore} from "@store";
import {ApiError} from "@libs/api-utils";

export const findAllRecipeLabels = async (
    req: NextApiRequest,
    res: NextApiResponse<RecipeLabelModel[] | ApiError>
) => {
    try {
        const recipeLabel = await shoppingManagerStore.recipeLabel.findAllRecipeLabels()
        return res
            .status(200)
            .json(recipeLabel);
    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }
}