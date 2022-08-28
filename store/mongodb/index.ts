import {StoreFunctions} from "../models/store-functions.interface";
import {
    AddRecipeInput,
    AddRecipeToMealPlanInput,
    DeleteRecipeFromMealPlanInput,
    MealPlanModel,
    UpdateRecipeInput
} from "@store";
import {
    addRecipe,
    deleteRecipe,
    findAllRecipes,
    findRecipeById,
    mapRecipeStoreToRecipeModel,
    mapUpdateRecipeInputToRecipeStore,
    updateRecipe
} from "./recipes";
import {findAllRecipeLabels, mapRecipeLabelStoreToRecipeLabel} from "./recipe-labels";
import {
    addRecipeToMealPlan,
    deleteRecipeFromMealPlan,
    findAllMealPlans,
    findMealPlanById,
    mapAddRecipeToMealPlanInputToMealPlanRecipeStore,
    mapMealPlanStoreToMealPlan,
    mapMealPlanToMealPlanStore,
    updateMealPlan
} from "./meal-plans";

export const mongodbStore: StoreFunctions = {
    mealPlan: {
        addRecipeToMealPlan: async (input: AddRecipeToMealPlanInput) => {
            const mealPlanRecipe = mapAddRecipeToMealPlanInputToMealPlanRecipeStore(input)
            const storeMealPlan = await addRecipeToMealPlan(input.mealPlanId, mealPlanRecipe);
            return storeMealPlan ? mapMealPlanStoreToMealPlan(storeMealPlan) : null;
        },
        deleteRecipeFromMealPlan: async (input: DeleteRecipeFromMealPlanInput) => {
            const storeMealPlan = await deleteRecipeFromMealPlan(input.mealPlanId, input.mealPlanRecipeId);
            return storeMealPlan ? mapMealPlanStoreToMealPlan(storeMealPlan) : null;
        },
        findAllMealPlans: async () => {
            const storeMealPlans = await findAllMealPlans();
            return storeMealPlans.map(mapMealPlanStoreToMealPlan);
        },
        findMealPlanById: async (mealPlanId: string) => {
            const storeMealPlan = await findMealPlanById(mealPlanId);
            return storeMealPlan ? mapMealPlanStoreToMealPlan(storeMealPlan) : null;
        },
        updateMealPlan: async (input: MealPlanModel) => {
            const storeInput = mapMealPlanToMealPlanStore(input);
            const storeMealPlan = await updateMealPlan(storeInput);
            return storeMealPlan ? mapMealPlanStoreToMealPlan(storeMealPlan) : null;
        },
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
        findAllRecipeLabels: async () => {
            const storeRecipeLabels = await findAllRecipeLabels();
            return storeRecipeLabels.map(mapRecipeLabelStoreToRecipeLabel);
        },
    }
}