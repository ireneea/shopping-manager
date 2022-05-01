import type {NextPage} from 'next'

import { PageLayout, RecipeList} from "@components";
import {GetStaticProps} from "next";
import {findAllRecipes, RecipeModel} from "@store";
import {useRouter} from "next/router";
import {ChangeEventHandler, useEffect, useState} from "react";

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

const MAX_SEARCH_RESULT = 5;

const Home: NextPage<HomePagePros> = ({ recipes}) => {

    const router = useRouter();

    const [planRecipes, setPlanRecipes] = useState<MealPlanRecipe[]>([]);
    const [searchResult, setSearchResult] = useState<RecipeModel[]>([]);
    const [searchText, setSearchText] = useState<string>("");


    useEffect(() => {
        if (searchText) {
            const matchingRecipes = recipes
                .filter(recipe => recipe.name.toLowerCase().includes(searchText.toLowerCase()))
            if (matchingRecipes.length > MAX_SEARCH_RESULT) {
                setSearchResult(matchingRecipes.slice(0, MAX_SEARCH_RESULT))
            } else {
                setSearchResult(matchingRecipes)
            }
        } else {
            setSearchResult([])
        }
    }, [searchText])


    const handleRecipeCreate = async (recipeName: string) => {
        setSearchText("");
        const addedRecipe = await createRecipe(recipeName);

        if (addedRecipe) {
            addRecipeToPlan(addedRecipe)
        }
    };

    const handleRecipeAddToPlan = (recipe: RecipeModel) => {
        setSearchText("")
        addRecipeToPlan(recipe)
    }

    const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        setSearchText(event.target.value)
    }

    const addRecipeToPlan = (recipe: RecipeModel) => {
        const mealRecipe: MealPlanRecipe = { id: `${Date.now()}`, name: recipe.name, recipeId: recipe.id}
        setPlanRecipes(recipes => [...recipes, mealRecipe])
    }

    const handleRecipeDelete = async (recipeId: string) => {
        await deleteRecipe(recipeId)
    }

    const handleRecipeDeleteFromPlan = () => (recipeId: string) => {
        setPlanRecipes(recipes => recipes.filter(r => r.id !== recipeId));
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
            const addedRecipe: RecipeModel = await response.json();
            return addedRecipe;
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
        }
    }

    const canShowCreateRecipeButton = () => {
        return searchText && !searchResult.length
    }

    return (
        <PageLayout pageTitle="Shopping Manager" isHomePage>
            <div>
                <input id="recipe-search" type="string" value={searchText} onChange={handleSearchTextChange}/>
                {canShowCreateRecipeButton() && (
                    <>
                        {' '}
                        <button onClick={() => handleRecipeCreate(searchText)}>Create Recipe</button>
                    </>
                )}

                <ul>
                    {searchResult.map(recipe => (
                        <li key={recipe.id}>
                            {recipe.name}
                            {' '}
                            <button onClick={() => handleRecipeAddToPlan(recipe)}>Add to meal plan</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Meal Plan</h2>
                <RecipeList recipes={planRecipes} onRecipeDelete={handleRecipeDeleteFromPlan}/>
            </div>

            <div>
                <h2>Recipes</h2>
                <RecipeList recipes={recipes} onRecipeDelete={handleRecipeDelete}/>
            </div>
        </PageLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const recipes = await findAllRecipes();
    // TODO: handle fetch error
    return {
        props: {
            recipes,
        }
    }
}


export default Home
