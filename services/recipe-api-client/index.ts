import {createRecipe} from "./create-recipe";
import {deleteRecipe} from "./delete-recipe";
import {addRecipeToMealPlan} from "./add-recipe-to-meal-plan";
import {deleteRecipeFromMealPlan} from "@services/recipe-api-client/delete-recipe-from-meal-plan";
import {reOrderMealPlanRecipes} from "@services/recipe-api-client/re-order-meal-plan-recipes";
import {updateRecipe} from "@services/recipe-api-client/update-recipe";

export const recipeApiClient = {
    createRecipe,
    deleteRecipe,
    addRecipeToMealPlan,
    deleteRecipeFromMealPlan,
    reOrderMealPlanRecipes,
    updateRecipe
};
