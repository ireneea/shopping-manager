import {AddRecipeToMealPlanInput} from "@store";
import {ObjectId} from "mongodb";
import {mapMealPlanRecipeToMealPlanRecipeStore} from "./map-meal-plan-recipe-to-meal-plan-recipe-store";

export const mapAddRecipeToMealPlanInputToMealPlanRecipeStore = (input: AddRecipeToMealPlanInput) => {
    const {recipe} = input;
    return mapMealPlanRecipeToMealPlanRecipeStore({
        id: (new ObjectId()).toHexString(),
        recipeId: recipe.id,
        name: recipe.name,
        labels: recipe.labels ?? [],
    })

}