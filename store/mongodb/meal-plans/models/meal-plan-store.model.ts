import {ObjectId} from "mongodb";
import {MealPlanRecipeStoreModel} from "./meal-plan-recipe-store.model";

export interface MealPlanStoreModel {
    _id: ObjectId;
    name: string;
    recipes: MealPlanRecipeStoreModel[];
}