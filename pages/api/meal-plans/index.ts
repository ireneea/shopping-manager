import {NextApiRequest, NextApiResponse} from "next";
import {MealPlanModel} from "@store";
import {ApiError, HttpMethod} from "@libs/api-utils";
import {findMealPlanHandler} from "@services/recipe-api";

const mealPlansController = async (
    req: NextApiRequest,
    res: NextApiResponse<MealPlanModel | ApiError>
) => {
    switch (req.method) {
        case HttpMethod.GET:
            return await findMealPlanHandler(req, res);
        default:
            return res
                .status(405)
                .json({error: `${req.method} method is not allowed`});
    }
};

export default mealPlansController;
