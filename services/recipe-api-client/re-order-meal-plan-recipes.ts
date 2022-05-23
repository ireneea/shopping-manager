import {BASE_URL} from "@services/recipe-api-client/base-url";
import {DEFAULT_HTTP_HEADER} from "@services/recipe-api-client/default-http-header";
import {MealPlanModel} from "@store";

interface ReOrderMealPlanRecipesInput {
    mealPlanId: string;
    recipesIds: string[];
}

export const reOrderMealPlanRecipes = async (input: ReOrderMealPlanRecipesInput) => {
    const response = await fetch(`${BASE_URL}/meal-plans/${input.mealPlanId}/recipes/re-order`, {
        method: "POST",
        body: JSON.stringify(input.recipesIds),
        ...DEFAULT_HTTP_HEADER
    });

    if (response.status < 300) {
        return await response.json() as MealPlanModel;
    }
}