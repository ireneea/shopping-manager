import {getDb} from "../../db/get-db";
import {MealPlanModel, StoreModel} from "@store";

export const updateMealPlan = async (mealPlanInput: MealPlanModel) => {
  const db = await getDb();
  const {mealPlans = []} = db.data ?? {};
  const index = mealPlans.findIndex((m) => m.id === mealPlanInput.id) ?? -1;

  if (index > -1) {
    (db.data as StoreModel).mealPlans = mealPlans.map((mealPlan) => {
      if (mealPlan.id === mealPlanInput.id) {
        return mealPlanInput;
      } else {
        return mealPlan;
      }
    });

    await db.write();
    return db.data?.mealPlans.find((m) => m.id === mealPlanInput.id) ?? null;
  }

  return null
};
