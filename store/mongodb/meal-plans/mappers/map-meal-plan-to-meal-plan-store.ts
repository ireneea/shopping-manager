import {MealPlanModel} from "@store";
import {MealPlanStoreModel} from "../models";
import {ObjectId} from "mongodb";
import {mapMealPlanRecipeToMealPlanRecipeStore} from "./map-meal-plan-recipe-to-meal-plan-recipe-store";

export const mapMealPlanToMealPlanStore = (mealPlan: MealPlanModel) => {
    return {
        _id: new ObjectId(mealPlan.id),
        name: mealPlan.name,
        recipes: mealPlan.recipes.map(mapMealPlanRecipeToMealPlanRecipeStore)
    } as MealPlanStoreModel;
}