import {BASE_URL} from "@services/recipe-api-client/base-url";
import {DEFAULT_HTTP_HEADER} from "@services/recipe-api-client/default-http-header";
import {DeleteRecipeFromMealPlanInput} from "@store";
import {DeleteMealPlanRecipeResponse} from "@services/recipe-api";

export const deleteRecipeFromMealPlan = async (
    input: DeleteRecipeFromMealPlanInput
) => {
    const response = await fetch(
        `${BASE_URL}/meal-plans/${input.mealPlanId}/recipes/${input.mealPlanRecipeId}`,
        {
            method: "DELETE",
            ...DEFAULT_HTTP_HEADER,
        }
    );

    if (response.status < 300) {
        return (await response.json()) as DeleteMealPlanRecipeResponse;
    }
};
