import {ObjectId, WithoutId} from "mongodb";
import {RECIPES_COLLECTION} from "./recipes.collection";
import {getDb} from "../../utils";
import {AddRecipeInput} from "@store";
import {RecipeStoreModel} from "../models";

export const addRecipe = async (input: AddRecipeInput) => {
    const db = await getDb();
    const collection = db.collection(RECIPES_COLLECTION);

    const newRecipe: WithoutId<RecipeStoreModel> = {
        name: input.name,
        labels: []
    }
    const result = await collection.insertOne(newRecipe);

    const query = {_id: new ObjectId(result.insertedId)}
    return await collection.findOne(query) as (RecipeStoreModel | null);
}