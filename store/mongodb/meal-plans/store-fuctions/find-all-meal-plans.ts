import {MAEL_PLANS_COLLECTION} from "./meal-plans.collection";
import {getDb} from "../../utils";
import {Collection} from "mongodb";
import {MealPlanStoreModel} from "../models";

export const findAllMealPlans = async () => {
    const db = await getDb();
    const collection: Collection<MealPlanStoreModel> = db.collection(MAEL_PLANS_COLLECTION);

    return await collection.find({}).toArray();
}