import {NextApiRequest, NextApiResponse} from "next";
import {RecipeLabelModel} from "@store";
import {ApiError, HttpMethod} from "@libs/api-utils";
import {findAllRecipeLabels} from "@services/recipe-api";

const recipeLabelController = async (
    req: NextApiRequest,
    res: NextApiResponse<RecipeLabelModel[] | ApiError>
) => {
    switch (req.method) {
        case HttpMethod.GET:
            return await findAllRecipeLabels(req, res)
        default:
            return res
                .status(405)
                .json({error: `${req.method} method is not allowed`});
    }
};

export default recipeLabelController;
