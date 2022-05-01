import type {NextPage} from 'next'

import {PageLayout, RecipeList, RecipeSearch} from "@components";
import {GetStaticProps} from "next";
import {findAllRecipes, RecipeModel} from "@store";
import {useRouter} from "next/router";
import {useState} from "react";

interface HomePagePros {
    recipes: RecipeModel[]
}

const API_HEADER = {
    headers: {
        "Content-Type": "application/json"
    }
}

export interface MealPlanRecipe {
    id: string;
    recipeId: string;
    name: string;
}

const Home: NextPage<HomePagePros> = ({ recipes}) => {

    const router = useRouter();

    const [planRecipes, setPlanRecipes] = useState<MealPlanRecipe[]>([]);

    const handleRecipeCreate = async (recipeName: string) => {
        const addedRecipe = await createRecipe(recipeName);

        if (addedRecipe) {
            addRecipeToPlan(addedRecipe)
        }
    };

    const handleRecipeAddToPlan = (recipe: RecipeModel) => {
        addRecipeToPlan(recipe)
    }


    const handleRecipeDelete = async (recipeId: string) => {
        await deleteRecipe(recipeId)
    }

    const handleRecipeDeleteFromPlan = (recipeId: string) => {
        setPlanRecipes(recipes => recipes.filter(r => r.id !== recipeId));
    }

    const addRecipeToPlan = (recipe: RecipeModel) => {
        const mealRecipe: MealPlanRecipe = { id: `${Date.now()}`, name: recipe.name, recipeId: recipe.id}
        setPlanRecipes(recipes => [...recipes, mealRecipe])
    }

    const createRecipe = async (recipeName: string) => {
        const response = await fetch("/api/recipes", {
            method: "POST",
            body: JSON.stringify({name: recipeName}),
            ...API_HEADER
        });

        if (response.status < 300) {
            // trigger reload of the recipes list
            await router.replace((router.asPath));
            return await response.json() as RecipeModel;
        }
    };

    const deleteRecipe = async (recipeId: string) => {
        const response = await fetch(`/api/recipes/${recipeId}`, {
            method: "DELETE",
            ...API_HEADER
        });

        if (response.status < 300) {
            // trigger reload of the recipes list
            await router.replace((router.asPath));
            return await response.json();
        }
    }

    return (
        <PageLayout pageTitle="Shopping Manager" isHomePage>
            <RecipeSearch
                recipes={recipes}
                onRecipeCreate={handleRecipeCreate}
                onRecipeSelect={handleRecipeAddToPlan}
            />

            <div>
                <h2>Meal Plan</h2>
                <RecipeList
                    recipes={planRecipes}
                    onRecipeDelete={handleRecipeDeleteFromPlan}
                />
            </div>

            <div>
                <h2>Recipes</h2>
                <RecipeList
                    recipes={recipes}
                    onRecipeSelect={handleRecipeAddToPlan}
                    onRecipeDelete={handleRecipeDelete}
                />
            </div>
        </PageLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const recipes = await findAllRecipes();
    return {
        props: {
            recipes,
        }
    }
}


export default Home
