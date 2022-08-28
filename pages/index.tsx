import type {NextPage} from "next";
import {useEffect, useState} from "react";

import {MealPlanModel, MealPlanRecipeModel, RecipeModel,} from "@store";
import {recipeApiClient} from "@services/recipe-api-client";
import {MealPlanRecipeList, PageLayout, RecipeList, RecipeSearch} from "@components";

interface HomePagePros {
    recipes: RecipeModel[];
    mealPlan: MealPlanModel;
}

function move<T>(from: number, to: number, arr: T[]): T[] {
    const isIndexValid = (index: number, arrLength: number) =>
        index >= 0 && index < arrLength;

    if (
        !isIndexValid(from, arr.length) ||
        !isIndexValid(to, arr.length) ||
        from === to
    ) {
        return arr;
    }

    const newArr = [...arr];

    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);

    return newArr;
}

const Home: NextPage<HomePagePros> = () => {

    const [searchText, setSearchText] = useState<string>("");
    const [recipes, setRecipes] = useState<RecipeModel[]>([])
    const [mealPlan, setMealPlan] = useState<MealPlanModel>()
    const [filteredRecipes, setFilteredRecipes] = useState<RecipeModel[]>(recipes);

    useEffect(() => {
        if (searchText) {
            const matchingRecipes = recipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRecipes(matchingRecipes);
        } else {
            setFilteredRecipes(recipes);
        }
    }, [searchText, recipes]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const result = await recipeApiClient.findAllRecipes();
            if (result) {
                setRecipes(result);
            }
        }

        fetchRecipes().catch(console.error)
    }, [])

    useEffect(() => {
        const fetchMealPlan = async () => {
            const result = await recipeApiClient.findMealPlan();
            if (result) {
                setMealPlan(result);
            }
        }

        fetchMealPlan().catch(console.error)
    }, [])

    const handleRecipeCreate = async () => {
        if (searchText) {
            const addedRecipe = await recipeApiClient.createRecipe(searchText);

            if (addedRecipe) {
                await handleRecipeAddToPlan(addedRecipe);
                setRecipes(prevState => [addedRecipe, ...prevState]);
                setSearchText("");
            }
        }
    };

    const handleRecipeDelete = async (recipeId: string) => {
        await recipeApiClient.deleteRecipe(recipeId);
        setRecipes(prevState => prevState.filter(r => r.id !== recipeId))
    };

    const handleRecipeAddToPlan = async (recipe: RecipeModel) => {
        if (mealPlan) {

            const plan = await recipeApiClient.addRecipeToMealPlan({
                mealPlanId: mealPlan.id,
                recipe,
            });

            if (plan) {
                setSearchText("");
                setMealPlan(plan);
            }
        }
    };

    const handleRecipeDeleteFromPlan = async (recipeId: string) => {
        if (mealPlan) {
            const plan = await recipeApiClient.deleteRecipeFromMealPlan({
                mealPlanId: mealPlan.id,
                mealPlanRecipeId: recipeId,
            });

            if (plan) {
                setMealPlan(plan);
            }
        }
    };

    const handleRecipeMoveUp = async (recipeId: string) => {
        if (mealPlan) {
            const index = mealPlan.recipes.findIndex(
                (recipe) => recipe.id === recipeId
            );
            const recipesIds = move<MealPlanRecipeModel>(
                index,
                index - 1,
                mealPlan.recipes
            ).map((r) => r.id);
            const plan = await recipeApiClient.reOrderMealPlanRecipes({
                mealPlanId: mealPlan.id,
                recipesIds,
            });

            if (plan) {
                setMealPlan(plan);
            }
        }
    };

    const handleRecipeMoveDown = async (recipeId: string) => {
        if (mealPlan) {
            const index = mealPlan.recipes.findIndex(
                (recipe) => recipe.id === recipeId
            );
            const recipesIds = move<MealPlanRecipeModel>(
                index,
                index + 1,
                mealPlan.recipes
            ).map((r) => r.id);
            const plan = await recipeApiClient.reOrderMealPlanRecipes({
                mealPlanId: mealPlan.id,
                recipesIds,
            });

            if (plan) {
                setMealPlan(plan);
            }
        }
    };

    return (
        <PageLayout pageTitle="Meal Shopping Manager">
            <RecipeSearch
                searchText={searchText}
                onSearchTextChange={setSearchText}
                onRecipeCreateClick={handleRecipeCreate}
            />

            {searchText ? (
                <RecipeList
                    recipes={filteredRecipes}
                    onRecipeSelect={handleRecipeAddToPlan}
                />
            ) : (
                <MealPlanRecipeList
                    recipes={mealPlan?.recipes ?? []}
                    onRecipeDelete={handleRecipeDeleteFromPlan}
                    onRecipeMoveUp={handleRecipeMoveUp}
                    onRecipeMoveDown={handleRecipeMoveDown}
                />
            )}

            <hr/>
            <h2>Recipes</h2>
            <RecipeList
                recipes={recipes}
                onRecipeSelect={handleRecipeAddToPlan}
                onRecipeDelete={handleRecipeDelete}
            />
        </PageLayout>
    );
};

export default Home;
