import {RecipeLabelModel} from "./recipe-label.model";

export interface MealPlanRecipeModel {
  id: string;
  recipeId: string;
  name: string;
  labels?: RecipeLabelModel[]
}
