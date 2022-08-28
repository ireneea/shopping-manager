import {BASE_URL} from "@services/recipe-api-client/base-url";
import {DEFAULT_HTTP_HEADER} from "@services/recipe-api-client/default-http-header";
import {MealPlanModel} from "@store";
import {HttpMethod} from "@libs/api-utils";

export const findMealPlan = async () => {
    const response = await fetch(
        `${BASE_URL}/meal-plans`,
        {
            method: HttpMethod.GET,
            ...DEFAULT_HTTP_HEADER,
        }
    );

    if (response.status < 300) {
        return (await response.json()) as MealPlanModel;
    }
};
