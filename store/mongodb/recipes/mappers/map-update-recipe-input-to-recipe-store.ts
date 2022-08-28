import {ObjectId} from "mongodb";
import {UpdateRecipeInput} from "@store";
import {RecipeStoreModel} from "../models";
import {mapRecipeLabelToRecipeLabelStore} from "../../recipe-labels";


export const mapUpdateRecipeInputToRecipeStore = (input: UpdateRecipeInput): RecipeStoreModel => ({
        _id: new ObjectId(input.recipeId),
        name: input.name,
        labels: input.labels.map(mapRecipeLabelToRecipeLabelStore)
    } as RecipeStoreModel
)