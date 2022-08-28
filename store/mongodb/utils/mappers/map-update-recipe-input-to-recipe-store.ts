import {ObjectId} from "mongodb";
import {RecipeLabelModel, UpdateRecipeInput} from "@store";
import {RecipeLabelStoreModel, RecipeStoreModel} from "../../models";

const mapRecipeLabelToRecipeLabelStore = (label: RecipeLabelModel) => {
    const storeLabel: RecipeLabelStoreModel = {
        _id: new ObjectId(label.id),
        name: label.name
    }
    return storeLabel
}


export const mapUpdateRecipeInputToRecipeStore = (input: UpdateRecipeInput): RecipeStoreModel => ({
        _id: new ObjectId(input.recipeId),
        name: input.name,
        labels: input.labels.map(mapRecipeLabelToRecipeLabelStore)
    } as RecipeStoreModel
)