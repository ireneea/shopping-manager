import {ObjectId} from "mongodb";
import {RecipeLabelStoreModel} from "./recipe-label-store.model";

export interface RecipeStoreModel {
    _id: ObjectId;
    name: string;
    labels?: RecipeLabelStoreModel[];
}