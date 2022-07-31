import {RecipeModel} from "../../models";

export interface AddRecipeToMealPlanInput {
  mealPlanId: string;
  recipe: RecipeModel
}
