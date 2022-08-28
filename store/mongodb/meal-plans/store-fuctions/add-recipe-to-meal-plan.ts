import {getDb} from "../../utils";
import {Collection, ObjectId} from "mongodb";
import {MealPlanRecipeStoreModel, MealPlanStoreModel} from "../models";
import {MAEL_PLANS_COLLECTION} from "./meal-plans.collection";

export const addRecipeToMealPlan = async (mealPlanId: string, mealPlanRecipe: MealPlanRecipeStoreModel) => {
    const db = await getDb();
    const collection: Collection<MealPlanStoreModel> = db.collection(MAEL_PLANS_COLLECTION);

    const result = await collection.findOneAndUpdate(
        {_id: new ObjectId(mealPlanId)},
        {$push: {recipes: mealPlanRecipe}},
        {returnDocument: "after"}
    )

    return result.value;
}
