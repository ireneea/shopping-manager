import {NextApiRequest, NextApiResponse} from "next";
import {addRecipeToMealPlan, AddRecipeToMealPlanInput, MealPlanModel,} from "@store";
import {ApiError} from "@libs/api-utils";

export const addMealPlanRecipeHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<MealPlanModel | null | ApiError>
) => {
  try {
    const input = req.body as AddRecipeToMealPlanInput;
    const mealPlan = await addRecipeToMealPlan(input);

    return res.status(200).json(mealPlan);

  } catch (err) {
    return res
      .status(500)
      .json({ error: (err as any).message || "Unexpected error" });
  }
};
