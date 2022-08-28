import {ObjectId} from "mongodb";
import {RECIPES_COLLECTION} from "./recipes.collection";
import {getDb} from "../utils";
import {RecipeStoreModel} from "../models";

export const deleteRecipe = async (recipeId: string) => {
    let deleted = null;

    const db = await getDb();
    const collection = db.collection(RECIPES_COLLECTION);

    const query = {_id: new ObjectId(recipeId)}
    const recipe = await collection.findOne(query) as (RecipeStoreModel | null);

    if (recipe) {
        const result = await collection.deleteOne(query);
        if (result && result.deletedCount) {
            deleted = recipe;
        }
    }

    return deleted;

}