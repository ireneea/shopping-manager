import {RecipeStoreModel} from "../models";
import {RecipeModel} from "@store";
import {mapRecipeLabelStoreToRecipeLabel} from "../../recipe-labels";

export const mapRecipeStoreToRecipeModel = (recipeStore: RecipeStoreModel): RecipeModel => ({
    id: recipeStore._id.toHexString(),
    name: recipeStore.name,
    labels: (recipeStore.labels ?? []).map(mapRecipeLabelStoreToRecipeLabel)
} as RecipeModel)