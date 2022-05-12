import {RecipeModel} from "./recipe.model";
import {MealPlanModel} from "./meal-plan.model";

export interface StoreModel {
    recipes: RecipeModel[];
    mealPlans: MealPlanModel[];
}