import {MealPlanStoreModel} from "../models";
import {MealPlanModel} from "@store";
import {mapMealPlanRecipeStoreToMealPlan} from "./map-meal-plan-recipe-store-to-meal-plan";

export const mapMealPlanStoreToMealPlan = (mealPlanStore: MealPlanStoreModel) => ({
    id: mealPlanStore._id.toHexString(),
    name: mealPlanStore.name,
    recipes: mealPlanStore.recipes.map(mapMealPlanRecipeStoreToMealPlan)
} as MealPlanModel)