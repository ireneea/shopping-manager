import {addRecipeToMealPlan, deleteRecipeFromMealPlan, findMealPlan, reOrderMealPlanRecipes} from "./meal-plans";

import {createRecipe, deleteRecipe, findAllRecipes, updateRecipe} from "./recipes";


export const recipeApiClient = {
    // meal plan
    addRecipeToMealPlan,
    deleteRecipeFromMealPlan,
    reOrderMealPlanRecipes,
    findMealPlan,

    // recipes
    createRecipe,
    deleteRecipe,
    updateRecipe,
    findAllRecipes
};
