import {getDb} from "../../utils";
import {Collection} from "mongodb";
import {MealPlanStoreModel} from "../models";
import {MAEL_PLANS_COLLECTION} from "./meal-plans.collection";

export const updateMealPlan = async (input: MealPlanStoreModel) => {
    const db = await getDb();
    const collection: Collection<MealPlanStoreModel> = db.collection(MAEL_PLANS_COLLECTION);

    const result = await collection.findOneAndUpdate(
        {_id: input._id},
        {$set: {...input}},
        {returnDocument: "after"}
    )

    return result.value;
}