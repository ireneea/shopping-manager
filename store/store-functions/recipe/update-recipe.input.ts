import {RecipeLabelModel} from "../../models";

export interface UpdateRecipeInput {
    recipeId: string;
    name: string;
    labels: RecipeLabelModel[];
}
