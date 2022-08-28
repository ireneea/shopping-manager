import {RecipeLabelModel} from "@store";
import {RecipeLabelStoreModel} from "../models";

export const mapRecipeLabelStoreToRecipeLabel = (recipeLabelStore: RecipeLabelStoreModel): RecipeLabelModel => ({
    id: recipeLabelStore._id.toHexString(),
    name: recipeLabelStore.name
} as RecipeLabelModel)

