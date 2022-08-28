import {getDb} from "../../utils";
import {Collection, ObjectId} from "mongodb";
import {MealPlanStoreModel} from "../models";
import {MAEL_PLANS_COLLECTION} from "./meal-plans.collection";

export const deleteRecipeFromMealPlan = async (mealPlanId: string, mealPlanRecipeId: string) => {
    const db = await getDb();
    const collection: Collection<MealPlanStoreModel> = db.collection(MAEL_PLANS_COLLECTION);

    const result = await collection.findOneAndUpdate(
        {_id: new ObjectId(mealPlanId)},
        {$pull: {recipes: {id: new ObjectId(mealPlanRecipeId)}}},
        {returnDocument: "after"}
    )

    return result.value
}
