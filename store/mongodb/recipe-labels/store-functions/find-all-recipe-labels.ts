import {RECIPE_LABEL_COLLECTION} from "./recipe-labels.collection";
import {getDb} from "../../utils";
import {Collection} from "mongodb";
import {RecipeLabelStoreModel} from "../models";

export const findAllRecipeLabels = async () => {
    const db = await getDb();
    const collection: Collection<RecipeLabelStoreModel> = db.collection(RECIPE_LABEL_COLLECTION);

    return await collection.find({}).toArray();
}