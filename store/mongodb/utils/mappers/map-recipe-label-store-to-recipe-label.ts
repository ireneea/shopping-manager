import {RecipeLabelStoreModel} from "../../models";
import {RecipeLabelModel} from "@store";

export const mapRecipeLabelStoreToRecipeLabel = (recipeLabelStore: RecipeLabelStoreModel): RecipeLabelModel => ({
    id: recipeLabelStore._id.toHexString(),
    name: recipeLabelStore.name
} as RecipeLabelModel)