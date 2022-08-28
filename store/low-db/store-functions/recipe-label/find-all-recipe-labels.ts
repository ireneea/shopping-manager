import {getDb} from "../../db/get-db";

export const findAllRecipeLabels = async () => {
    const db = await getDb();
    return db.data ? db.data.recipeLabels : [];
};
