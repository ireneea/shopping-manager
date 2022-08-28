import {NextApiRequest, NextApiResponse} from "next";
import {ApiError} from "@libs/api-utils";
import {MealPlanModel, MealPlanRecipeModel, shoppingManagerStore,} from "@store";
import {ReOrderMealPlanRecipesInput} from "./re-order-meal-plan-recipes.input";

export const reOrderMealPlanRecipesHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<MealPlanModel | ApiError>
) => {
  try {
    const input = req.body as ReOrderMealPlanRecipesInput;
    const {mealPlanId, recipesIds} = input;
    const mealPlan = await shoppingManagerStore.mealPlan.findMealPlanById(mealPlanId);

    if (!mealPlan) {
      return res
        .status(404)
        .json({ error: `Meal plan ${mealPlanId} not found` });
    }

    const recipes = recipesIds.reduce((acc, recipeId) => {
      const recipe = mealPlan.recipes.find((r) => r.id === recipeId);
      if (recipe) {
        return [...acc, recipe];
      } else {
        return acc;
      }
    }, [] as MealPlanRecipeModel[]);

    if (recipes.length !== mealPlan.recipes.length) {
      return res
        .status(400)
        .json({ error: "Cannot re-order recipes: Invalid recipesIds input" });
    }

    const updatedMealPlan = await shoppingManagerStore.mealPlan.updateMealPlan({
      ...mealPlan,
      recipes,
    });

    if (!updatedMealPlan) {
      return res
        .status(404)
        .json({ error: `Meal plan ${mealPlanId} not found` });
    } else {
      return res.status(200).json(updatedMealPlan);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: (err as any).message || "Unexpected error" });
  }
};
