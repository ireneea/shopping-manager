import { getDb } from "../../db/get-db";

export const findAllRecipes = async () => {
  const db = await getDb();
  return db.data ? db.data.recipes : [];
};
