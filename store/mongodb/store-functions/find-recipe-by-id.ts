import {ObjectId} from "mongodb";
import {RECIPES_COLLECTION} from "./recipes.collection";
import {getDb} from "../utils";
import {RecipeStoreModel} from "../models";

export const findRecipeById = async (recipeId: string) => {
    const db = await getDb();
    const collection = db.collection(RECIPES_COLLECTION);

    const query = {_id: new ObjectId(recipeId)}
    return await collection.findOne(query) as (RecipeStoreModel | null);
}