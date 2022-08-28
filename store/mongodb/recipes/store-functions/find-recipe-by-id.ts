import {RecipeStoreModel} from "../models";

import {Collection, ObjectId} from "mongodb";
import {RECIPES_COLLECTION} from "./recipes.collection";
import {getDb} from "../../utils";

export const findRecipeById = async (recipeId: string) => {
    const db = await getDb();
    const collection: Collection<RecipeStoreModel> = db.collection(RECIPES_COLLECTION);

    const query = {_id: new ObjectId(recipeId)}
    return await collection.findOne(query);
}