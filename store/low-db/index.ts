import {StoreFunctions} from "../models/store-functions.interface";

import {
    addRecipe,
    addRecipeToMealPlan,
    deleteRecipe,
    deleteRecipeFromMealPlan,
    findAllMealPlans,
    findAllRecipeLabels,
    findAllRecipes,
    findMealPlanById,
    findRecipeById,
    updateMealPlan,
    updateRecipe
} from "./store-functions";

export const lowDgStore: StoreFunctions = {
    mealPlan: {
        addRecipeToMealPlan,
        deleteRecipeFromMealPlan,
        findAllMealPlans,
        findMealPlanById,
        updateMealPlan
    },
    recipe: {
        addRecipe,
        deleteRecipe,
        findAllRecipes,
        findRecipeById,
        updateRecipe
    },
    recipeLabel: {
        findAllRecipeLabels
    }
}