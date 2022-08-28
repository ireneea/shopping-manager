import {RECIPES_COLLECTION} from "./recipes.collection";
import {getDb} from "../utils";
import {RecipeStoreModel} from "../models";
import {Collection} from "mongodb";

export const updateRecipe = async (input: RecipeStoreModel) => {
    const db = await getDb();
    const collection: Collection<RecipeStoreModel> = db.collection(RECIPES_COLLECTION);

    const result = await collection.findOneAndUpdate(
        {_id: input._id},
        {$set: {...input}},
        {returnDocument: "after"}
    )

    return result.value
}

