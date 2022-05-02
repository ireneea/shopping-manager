import {getDb} from "../../db/get-db";
import {DeleteRecipeToMealPlanInput} from "./delete-recipe-from-meal-plan.input";

export const deleteRecipeFromMealPlan = async (input: DeleteRecipeToMealPlanInput) => {
    const db = await getDb();
    const mealPlan = db.data?.mealPlans.find(m => m.id === input.mealPlanId);

    if (mealPlan) {
        let recipeIndex = mealPlan.recipes
            .findIndex((recipe) => recipe.id === input.mealRecipeId);

        if (recipeIndex > -1) {
            mealPlan.recipes.splice(recipeIndex, 1);
            await db.write();
            return mealPlan;
        }
    }
}