import {NextApiRequest, NextApiResponse} from "next";
import {ApiError} from "@libs/api-utils";
import {deleteRecipeFromMealPlan} from "@store";
import {DeleteMealPlanRecipeResponse} from "./delete-meal-plan-recipe.response";

export const deleteMealPlanRecipeHandler = async (req: NextApiRequest, res: NextApiResponse<DeleteMealPlanRecipeResponse | ApiError>) => {
    try {
        const mealPlanRecipeId = req.query.mealRecipeId as string;
        const mealPlanId = req.query.mealPlanId as string;
        const mealPlan = await deleteRecipeFromMealPlan({
            mealPlanId,
            mealPlanRecipeId
        })

        if (mealPlan) {
            return res
                .status(200)
                .json({
                    deleted: {
                        mealPlanId,
                        mealPlanRecipeId
                    }
                });
        } else {
            return res
                .status(404)
                .json({ error: "Meal Plan or recipe not found"});
        }
    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }

}