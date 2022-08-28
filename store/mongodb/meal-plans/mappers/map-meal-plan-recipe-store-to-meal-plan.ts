import {MealPlanRecipeStoreModel} from "../models";
import {MealPlanRecipeModel} from "@store";
import {mapRecipeLabelStoreToRecipeLabel} from "../../recipe-labels";


export const mapMealPlanRecipeStoreToMealPlan = (mealPlanRecipeStore: MealPlanRecipeStoreModel) => ({
    id: mealPlanRecipeStore.id.toHexString(),
    recipeId: mealPlanRecipeStore.recipeId.toHexString(),
    name: mealPlanRecipeStore.name,
    labels: mealPlanRecipeStore.labels.map(mapRecipeLabelStoreToRecipeLabel)
} as MealPlanRecipeModel)

