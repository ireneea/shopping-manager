import {ObjectId} from "mongodb";

export interface RecipeLabelStoreModel {
    _id: ObjectId;
    name: string;
}