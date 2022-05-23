import {NextApiRequest, NextApiResponse} from "next";
import {ApiError, HttpMethod} from '@libs/api-utils';
import {MealPlanModel} from "@store";

const reOrderController = async (req: NextApiRequest, res: NextApiResponse<MealPlanModel | ApiError>) => {
    switch (req.method) {
        case HttpMethod.POST:
            return res
                .status(500)
                .json({error: 'Not implemented'});
        default:
            return res
                .status(405)
                .json({error: `${req.method} method is not allowed`});
    }
}

export default reOrderController;