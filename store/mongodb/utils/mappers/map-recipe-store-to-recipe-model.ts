import {RecipeStoreModel} from "../../models";
import {RecipeModel} from "@store";
import {mapRecipeLabelStoreToRecipeLabel} from "./map-recipe-label-store-to-recipe-label";

export const mapRecipeStoreToRecipeModel = (recipeStore: RecipeStoreModel): RecipeModel => ({
    id: recipeStore._id.toHexString(),
    name: recipeStore.name,
    labels: (recipeStore.labels ?? []).map(mapRecipeLabelStoreToRecipeLabel)
} as RecipeModel)