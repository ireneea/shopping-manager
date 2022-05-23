import {NextApiRequest, NextApiResponse} from "next";
import {ApiError, HttpMethod} from '@libs/api-utils';
import {MealPlanModel} from "@store";
import {reOrderMealPlanRecipesHandler} from "@services/recipe-api/meal-plan/re-order-meal-plan-recipes.handler";

const reOrderController = async (req: NextApiRequest, res: NextApiResponse<MealPlanModel | ApiError>) => {
    switch (req.method) {
        case HttpMethod.POST:
            return await reOrderMealPlanRecipesHandler(req, res);
        default:
            return res
                .status(405)
                .json({error: `${req.method} method is not allowed`});
    }
}

export default reOrderController;