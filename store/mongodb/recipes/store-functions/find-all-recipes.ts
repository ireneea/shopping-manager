import {Collection} from "mongodb";

import {getDb} from "../../utils";
import {RECIPES_COLLECTION} from "./recipes.collection";
import {RecipeStoreModel} from "../models";

export const findAllRecipes = async () => {
    const db = await getDb();
    const collection: Collection<RecipeStoreModel> = db.collection(RECIPES_COLLECTION);

    return await collection.find({}).toArray();
}
