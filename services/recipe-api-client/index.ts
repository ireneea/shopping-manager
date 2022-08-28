import {addRecipeToMealPlan, deleteRecipeFromMealPlan, findMealPlan, reOrderMealPlanRecipes} from "./meal-plans";

import {createRecipe, deleteRecipe, findAllRecipes, findRecipeById, updateRecipe} from "./recipes";
import {findAllRecipeLabels} from "@services/recipe-api-client/recipe-labels";


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
    findAllRecipes,
    findRecipeById,

    // recipe labels
    findAllRecipeLabels
};
