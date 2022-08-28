import {getDb} from "../../utils";
import {Collection, ObjectId} from "mongodb";
import {MealPlanStoreModel} from "../models";
import {MAEL_PLANS_COLLECTION} from "./meal-plans.collection";

export const findMealPlanById = async (maelPlanId: string) => {
    const db = await getDb();
    const collection: Collection<MealPlanStoreModel> = db.collection(MAEL_PLANS_COLLECTION);

    const query = {_id: new ObjectId(maelPlanId)};
    return await collection.findOne(query)

}