import {getDb} from "../../db/get-db";
import {randomUUID} from "crypto";
import {AddRecipeToMealPlanInput} from "./add-recipe-to-meal-plan.input";

export const addRecipeToMealPlan = async (input: AddRecipeToMealPlanInput) => {
    const db = await getDb();
    const mealPlan = db.data?.mealPlans.find(m => m.id === input.mealPlanId);

    if (mealPlan) {
        mealPlan.recipes.push({
            id: randomUUID(),
            recipeId: input.recipe.id,
            name: input.recipe.name
        })
        await db.write();
        return mealPlan;
    }

    return null;
}