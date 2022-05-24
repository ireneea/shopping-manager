import { NextApiRequest, NextApiResponse } from "next";
import { ApiError, HttpMethod } from "@libs/api-utils";
import { DeleteMealPlanRecipeResponse } from "@services/recipe-api";
import { deleteMealPlanRecipeHandler } from "@services/recipe-api/meal-plan/delete-meal-plan-recipe.handler";

const recipeController = async (
  req: NextApiRequest,
  res: NextApiResponse<DeleteMealPlanRecipeResponse | ApiError>
) => {
  switch (req.method) {
    case HttpMethod.DELETE:
      return deleteMealPlanRecipeHandler(req, res);
    default:
      return res
        .status(405)
        .json({ error: `${req.method} method is not allowed` });
  }
};

export default recipeController;
