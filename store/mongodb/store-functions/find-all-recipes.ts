import {getDb} from "../utils";
import {RECIPES_COLLECTION} from "./recipes.collection";
import {RecipeStoreModel} from "../models";
import {WithId} from "mongodb";

export const findAllRecipes = async () => {
    const db = await getDb();
    const collection = db.collection(RECIPES_COLLECTION);

    return await collection.find({}).toArray() as WithId<RecipeStoreModel>[];
}
