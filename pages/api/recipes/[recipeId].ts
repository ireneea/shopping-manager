import {NextApiRequest, NextApiResponse} from "next";
import {ApiError, HttpMethod} from "@libs/api-utils";
import {
  deleteRecipeHandler,
  DeleteRecipeResponse,
  findRecipeByIdHandler,
  updateRecipeHandler,
} from "@services/recipe-api";
import {RecipeModel} from "@store";

const recipeController = async (
    req: NextApiRequest,
    res: NextApiResponse<DeleteRecipeResponse | RecipeModel | null | ApiError>
) => {
  switch (req.method) {
    case HttpMethod.GET:
      return findRecipeByIdHandler(req, res);
    case HttpMethod.DELETE:
      return deleteRecipeHandler(req, res);
    case HttpMethod.PATCH:
      return updateRecipeHandler(req, res);
    default:
      return res
          .status(405)
          .json({error: `${req.method} method is not allowed`});
  }
};

export default recipeController;
