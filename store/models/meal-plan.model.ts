import { MealPlanRecipeModel } from "./meal-plan-recipe.model";

export interface MealPlanModel {
  id: string;
  name: string;
  recipes: MealPlanRecipeModel[];
}
