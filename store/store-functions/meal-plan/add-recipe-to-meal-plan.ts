import {getDb} from "../../db/get-db";
import {randomUUID} from "crypto";
import {AddRecipeToMealPlanInput, MealPlanModel} from "../../models";

export const addRecipeToMealPlan = async (input: AddRecipeToMealPlanInput) => {
  const db = await getDb();
  const mealPlan = db.data?.mealPlans.find((m) => m.id === input.mealPlanId) as MealPlanModel;

  if (mealPlan) {
    mealPlan.recipes.push({
      id: randomUUID(),
      recipeId: input.recipe.id,
      name: input.recipe.name,
      labels: input.recipe.labels
    });
    await db.write();
    return mealPlan;
  }

  return null;
};
