import {RecipeLabelModel} from "@store";
import {RecipeLabelStoreModel} from "../models";
import {ObjectId} from "mongodb";

export const mapRecipeLabelToRecipeLabelStore = (label: RecipeLabelModel) => {
    const storeLabel: RecipeLabelStoreModel = {
        _id: new ObjectId(label.id),
        name: label.name
    }
    return storeLabel
}
