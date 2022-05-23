import {NextApiRequest, NextApiResponse} from "next";
import {ApiError} from "@libs/api-utils";
import {MealPlanModel} from "@store";
import {ReOrderMealPlanRecipesInput} from "./re-order-meal-plan-recipes.input";

export const reOrderMealPlanRecipesHandler = async (req: NextApiRequest, res: NextApiResponse<MealPlanModel | ApiError>) => {
    try {
        const input = req.body as ReOrderMealPlanRecipesInput;
        const { mealPlanId, recipesIds } = input;
        console.log(mealPlanId, recipesIds)

        return res
            .status(500)
            .json({ error: 'Not implemented'});

    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }
}