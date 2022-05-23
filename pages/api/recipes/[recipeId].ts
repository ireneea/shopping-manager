import { NextApiRequest, NextApiResponse } from "next";
import { ApiError, HttpMethod } from "@libs/api-utils"
import {
  DeleteRecipeResponse,
  deleteRecipeHandler,
} from "@services/recipe-api";

const recipeController = async (
  req: NextApiRequest,
  res: NextApiResponse<DeleteRecipeResponse | ApiError>
) => {
  switch (req.method) {
    case HttpMethod.DELETE:
      return deleteRecipeHandler(req, res);
    default:
      return res
        .status(405)
        .json({ error: `${req.method} method is not allowed` });
  }
};

export default recipeController;
