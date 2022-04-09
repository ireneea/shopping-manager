import {NextApiRequest, NextApiResponse} from "next";
import {RecipeModel} from "../../../store/models/recipe.model";
import {ApiError, HttpMethod} from "../../../libs/api-utils";
import {addRecipeHandler} from "../../../services/recipe-api";


const recipesController = async (req: NextApiRequest, res: NextApiResponse<RecipeModel | ApiError>) => {
    switch (req.method) {
        case HttpMethod.POST:
            return await addRecipeHandler(req, res);
        default:
            return res.status(405).json({error: `${req.method} method is not allowed`});
    }
}

export default recipesController;