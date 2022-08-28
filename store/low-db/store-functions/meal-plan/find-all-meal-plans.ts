import {getDb} from "../../db/get-db";

export const findAllMealPlans = async () => {
  const db = await getDb();

  if (db.data?.mealPlans.length) {
    return db.data.mealPlans;
  }

  return [];
};
