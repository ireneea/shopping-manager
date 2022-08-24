import {getDb} from "../../db/get-db";

export const findMealPlanById = async (mealPlanId: string) => {
  const db = await getDb();
  return db.data?.mealPlans.find((mealPlan) => mealPlan.id === mealPlanId) ?? null;
};
