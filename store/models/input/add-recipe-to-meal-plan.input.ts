import {RecipeModel} from "../index";

export interface AddRecipeToMealPlanInput {
  mealPlanId: string;
  recipe: RecipeModel
}
