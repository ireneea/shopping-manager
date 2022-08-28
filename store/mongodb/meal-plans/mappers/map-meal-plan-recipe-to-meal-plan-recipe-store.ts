import {MealPlanRecipeModel} from "@store";
import {ObjectId} from "mongodb";
import {mapRecipeLabelToRecipeLabelStore} from "../../recipe-labels";
import {MealPlanRecipeStoreModel} from "../models";

export const mapMealPlanRecipeToMealPlanRecipeStore = (mealPlanRecipe: MealPlanRecipeModel) => {
    return {
        id: new ObjectId(mealPlanRecipe.id),
        recipeId: new ObjectId(mealPlanRecipe.id),
        name: mealPlanRecipe.name,
        labels: (mealPlanRecipe.labels ?? [])?.map(mapRecipeLabelToRecipeLabelStore),
    } as MealPlanRecipeStoreModel
}