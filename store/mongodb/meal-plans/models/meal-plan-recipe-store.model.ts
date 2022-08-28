import {ObjectId} from "mongodb";
import {RecipeLabelStoreModel} from "../../recipe-labels";

export interface MealPlanRecipeStoreModel {
    id: ObjectId;
    recipeId: ObjectId;
    name: string;
    labels: RecipeLabelStoreModel[];
}