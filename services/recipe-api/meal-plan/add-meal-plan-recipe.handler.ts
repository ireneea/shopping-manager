import {NextApiRequest, NextApiResponse} from "next";
import {
    addRecipeToMealPlan,
    AddRecipeToMealPlanInput,
    MealPlanModel,
} from "@store";
import {ApiError} from "@libs/api-utils";

export const addMealPlanRecipeHandler = async (req: NextApiRequest, res: NextApiResponse<MealPlanModel | ApiError>) => {
    try {
        const input = req.body as AddRecipeToMealPlanInput;
        const mealPlan = await addRecipeToMealPlan(input);

        if (mealPlan) {
            return res
                .status(200)
                .json(mealPlan);
        } else {
            return res
                .status(404)
                .json({error: "Meal plan not found"});
        }
    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }
}