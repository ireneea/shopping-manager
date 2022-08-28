import {NextApiRequest, NextApiResponse} from "next";
import {ApiError} from "@libs/api-utils";
import {MealPlanModel, shoppingManagerStore} from "@store";

export const findMealPlanHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<MealPlanModel | ApiError>
) => {
    try {
        const mealPlans = await shoppingManagerStore.mealPlan.findAllMealPlans()

        if (mealPlans && mealPlans.length) {
            return res.status(200).json(mealPlans[0]);
        } else {
            return res.status(404).json({error: "Meal Plan not found"});
        }
    } catch (err) {
        return res
            .status(500)
            .json({error: (err as any).message || "Unexpected error"});
    }
};
