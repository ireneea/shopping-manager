import {NextApiRequest, NextApiResponse} from "next";
import {ApiError} from "@libs/api-utils";
import {findMealPlanById, MealPlanModel, MealPlanRecipeModel, updateMealPlan} from "@store";
import {ReOrderMealPlanRecipesInput} from "./re-order-meal-plan-recipes.input";

export const reOrderMealPlanRecipesHandler = async (req: NextApiRequest, res: NextApiResponse<MealPlanModel | ApiError>) => {
    try {
        const input = req.body as ReOrderMealPlanRecipesInput;
        const { mealPlanId, recipesIds } = input;
        const mealPlan = await findMealPlanById(mealPlanId);

        if (!mealPlan) {
            return res
                .status(404)
                .json({ error: `Meal plan ${mealPlanId} not found`})
        }

        const updatedMealPlan = await updateMealPlan({
            ...mealPlan,
            recipes: recipesIds.map(recipeId => mealPlan.recipes.find(r => r.id === recipeId) as MealPlanRecipeModel)
        });

        if (!updatedMealPlan) {
            return res
                .status(404)
                .json({ error: `Meal plan ${mealPlanId} not found`})
        } else {
            return res
                .status(200)
                .json(updatedMealPlan)
        }
    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }
}