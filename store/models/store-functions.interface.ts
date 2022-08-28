import {
    AddRecipeInput,
    AddRecipeToMealPlanInput,
    DeleteRecipeFromMealPlanInput,
    MealPlanModel,
    RecipeLabelModel,
    RecipeModel,
    UpdateRecipeInput
} from "@store";

export interface MealPlanStoreFunctions {
    addRecipeToMealPlan: (input: AddRecipeToMealPlanInput) => Promise<MealPlanModel | null>;
    deleteRecipeFromMealPlan: (input: DeleteRecipeFromMealPlanInput) => Promise<MealPlanModel | null>;
    findAllMealPlans: () => Promise<MealPlanModel[]>;
    findMealPlanById: (id: string) => Promise<MealPlanModel | null>;
    updateMealPlan: (input: MealPlanModel) => Promise<MealPlanModel | null>;
}

export interface RecipeStoreFunctions {
    addRecipe: (input: AddRecipeInput) => Promise<RecipeModel | null>;
    deleteRecipe: (id: string) => Promise<RecipeModel | null>;
    findAllRecipes: () => Promise<RecipeModel[]>;
    findRecipeById: (id: string) => Promise<RecipeModel | null>;
    updateRecipe: (input: UpdateRecipeInput) => Promise<RecipeModel | null>;
}

export interface RecipeLabelStoreFunctions {
    findAllRecipeLabels: () => Promise<RecipeLabelModel[]>;
}

export interface StoreFunctions {
    mealPlan: MealPlanStoreFunctions
    recipe: RecipeStoreFunctions
    recipeLabel: RecipeLabelStoreFunctions
}