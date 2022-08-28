import {ObjectId} from "mongodb";
import {RecipeLabelStoreModel} from "../../recipe-labels";

export interface RecipeStoreModel {
    _id: ObjectId;
    name: string;
    labels?: RecipeLabelStoreModel[];
}