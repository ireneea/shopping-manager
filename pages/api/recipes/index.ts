import {NextApiRequest, NextApiResponse} from "next";
import {RecipeModel} from "@store";
import {ApiError, HttpMethod} from "@libs/api-utils";
import {addRecipeHandler} from "@services/recipe-api";
import {findAllRecipesHandler} from "@services/recipe-api/recipe/find-all-recipes.handler";

const recipesController = async (
    req: NextApiRequest,
    res: NextApiResponse<RecipeModel | RecipeModel[] | ApiError>
) => {
    switch (req.method) {
        case HttpMethod.GET:
            return await findAllRecipesHandler(req, res);
        case HttpMethod.POST:
            return await addRecipeHandler(req, res);
        default:
            return res
                .status(405)
                .json({error: `${req.method} method is not allowed`});
    }
};

export default recipesController;
