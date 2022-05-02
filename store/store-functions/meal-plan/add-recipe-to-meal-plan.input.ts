export interface AddRecipeToMealPlanInput {
    mealPlanId: string;
    recipe: {
        id: string;
        name: string;
    }
}