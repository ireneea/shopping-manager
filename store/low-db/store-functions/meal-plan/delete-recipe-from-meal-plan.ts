import {getDb} from "../../db/get-db";
import {DeleteRecipeFromMealPlanInput} from "../../../models";

export const deleteRecipeFromMealPlan = async (
    input: DeleteRecipeFromMealPlanInput
) => {
  const db = await getDb();
  const mealPlan = db.data?.mealPlans.find((m) => m.id === input.mealPlanId);

  if (mealPlan) {
    let recipeIndex = mealPlan.recipes.findIndex(
        (recipe) => recipe.id === input.mealPlanRecipeId
    );

    if (recipeIndex > -1) {
      mealPlan.recipes.splice(recipeIndex, 1);
      await db.write();
    }

    return mealPlan;
  } else {
    return null;
  }
};
