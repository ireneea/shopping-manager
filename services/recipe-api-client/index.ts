import {createRecipe} from "./create-recipe";
import {deleteRecipe} from "./delete-recipe";
import {addRecipeToMealPlan} from "./add-recipe-to-meal-plan";
import {deleteRecipeFromMealPlan} from "@services/recipe-api-client/delete-recipe-from-meal-plan";

export const recipeApiClient = {
    createRecipe,
    deleteRecipe,
    addRecipeToMealPlan,
    deleteRecipeFromMealPlan
 }