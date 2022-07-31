import {RecipeLabelModel} from "./recipe-label.model";

export interface RecipeModel {
  id: string;
  name: string;
  labels?: RecipeLabelModel[];
}
