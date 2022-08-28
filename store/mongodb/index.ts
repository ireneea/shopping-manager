import {StoreFunctions} from "../models/store-functions.interface";
import {AddRecipeInput, UpdateRecipeInput} from "@store";
import {addRecipe, deleteRecipe, findAllRecipes, findRecipeById, updateRecipe} from "./store-functions";
import {mapRecipeStoreToRecipeModel, mapUpdateRecipeInputToRecipeStore} from "./utils/mappers";

const MOCK_MEAL_PLAN = {
    id: "A04B2C78-6CA9-41FF-A0D2-68FCFD28C6A6",
    name: "My Plan",
    recipes: []
}

export const mongodbStore: StoreFunctions = {
    mealPlan: {
        addRecipeToMealPlan: async () => MOCK_MEAL_PLAN,
        deleteRecipeFromMealPlan: async () => MOCK_MEAL_PLAN,
        findAllMealPlans: async () => [MOCK_MEAL_PLAN],
        findMealPlanById: async () => MOCK_MEAL_PLAN,
        updateMealPlan: async () => MOCK_MEAL_PLAN,
    },
    recipe: {
        addRecipe: async (input: AddRecipeInput) => {
            const storeRecipe = await addRecipe(input);
            return storeRecipe ? mapRecipeStoreToRecipeModel(storeRecipe) : null;
        },
        deleteRecipe: async (recipeId: string) => {
            const storeRecipe = await deleteRecipe(recipeId);
            return storeRecipe ? mapRecipeStoreToRecipeModel(storeRecipe) : null;
        },
        findAllRecipes: async () => {
            const storeRecipes = await findAllRecipes();
            return storeRecipes.map(mapRecipeStoreToRecipeModel);
        },
        findRecipeById: async (recipeId: string) => {
            const storeRecipe = await findRecipeById(recipeId);
            return storeRecipe ? mapRecipeStoreToRecipeModel(storeRecipe) : null;
        },
        updateRecipe: async (input: UpdateRecipeInput) => {
            const storeInput = mapUpdateRecipeInputToRecipeStore(input);
            const storeRecipe = await updateRecipe(storeInput);
            return storeRecipe ? mapRecipeStoreToRecipeModel(storeRecipe) : null;
        },
    },
    recipeLabel: {
        findAllRecipeLabels: async () => [],
    }
}