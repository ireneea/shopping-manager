import {BASE_URL} from "@services/recipe-api-client/base-url";
import {DEFAULT_HTTP_HEADER} from "@services/recipe-api-client/default-http-header";
import {MealPlanModel} from "@store";
import {ReOrderMealPlanRecipesInput} from "@services/recipe-api";

export const reOrderMealPlanRecipes = async (
    input: ReOrderMealPlanRecipesInput
) => {
    const response = await fetch(
        `${BASE_URL}/meal-plans/${input.mealPlanId}/recipes/re-order`,
        {
            method: "POST",
            body: JSON.stringify(input),
            ...DEFAULT_HTTP_HEADER,
    }
  );

  if (response.status < 300) {
    return (await response.json()) as MealPlanModel;
  }
};
