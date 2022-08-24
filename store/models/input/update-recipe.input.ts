import {RecipeLabelModel} from "../index";

export interface UpdateRecipeInput {
    recipeId: string;
    name: string;
    labels: RecipeLabelModel[];
}
