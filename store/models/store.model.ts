import {RecipeModel} from "./recipe.model";
import {MealPlanModel} from "./meal-plan.model";
import {RecipeLabelModel} from "./recipe-label.model";

export interface StoreModel {
  recipes: RecipeModel[];
  mealPlans: MealPlanModel[];
  recipeLabels: RecipeLabelModel[];
}
