import {createRecipe} from "./create-recipe";
import {deleteRecipe} from "./delete-recipe";
import {addRecipeToMealPlan} from "@services/recipe-api-client/add-recipe-to-meal-plan";

export const recipeApiClient = {
    createRecipe,
    deleteRecipe,
    addRecipeToMealPlan
}