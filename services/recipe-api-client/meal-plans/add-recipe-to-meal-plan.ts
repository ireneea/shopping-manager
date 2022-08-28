import {AddRecipeToMealPlanInput, MealPlanModel} from "@store";

import {DEFAULT_HTTP_HEADER} from "../default-http-header";
import {BASE_URL} from "../base-url";

export const addRecipeToMealPlan = async (input: AddRecipeToMealPlanInput) => {
    const response = await fetch(
        `${BASE_URL}/meal-plans/${input.mealPlanId}/recipes`,
        {
            method: "POST",
            body: JSON.stringify(input),
            ...DEFAULT_HTTP_HEADER,
        }
    );

  if (response.status < 300) {
      return (await response.json()) as MealPlanModel | null;
  }
};
