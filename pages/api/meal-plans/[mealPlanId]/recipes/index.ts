import { NextApiRequest, NextApiResponse } from "next";
import { MealPlanModel } from "@store";
import { ApiError, HttpMethod } from "@libs/api-utils";
import { addMealPlanRecipeHandler } from "@services/recipe-api";

const mealPlanRecipesController = async (
  req: NextApiRequest,
  res: NextApiResponse<MealPlanModel | ApiError>
) => {
  switch (req.method) {
    case HttpMethod.POST:
      return await addMealPlanRecipeHandler(req, res);
    default:
      return res
        .status(405)
        .json({ error: `${req.method} method is not allowed` });
  }
};

export default mealPlanRecipesController;
