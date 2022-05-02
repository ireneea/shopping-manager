import type {NextPage} from 'next'

import {PageLayout, RecipeList, RecipeSearchInput} from "@components";
import {GetStaticProps} from "next";
import {findAllRecipes, RecipeModel} from "@store";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {RecipeCreateButton} from "../components/RecipeCreateButton";

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
    const [searchText, setSearchText] = useState<string>("");

    const [filteredRecipes, setFilteredRecipes] = useState<RecipeModel[]>(recipes);

    useEffect(() => {
        if (searchText) {
            const matchingRecipes = recipes
                .filter(recipe => recipe.name.toLowerCase().includes(searchText.toLowerCase()))
            setFilteredRecipes(matchingRecipes)
        } else {
            setFilteredRecipes(recipes)
        }
    }, [searchText])



    const handleRecipeCreate = async () => {
        if (searchText) {
            const addedRecipe = await createRecipe(searchText);
            addedRecipe && addRecipeToPlan(addedRecipe);
            setSearchText("")
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

    const isCreateButtonDisabled = () => {
        return !searchText
    }

    return (
        <PageLayout pageTitle="Shopping Manager" isHomePage>
            <RecipeList
                recipes={planRecipes}
                onRecipeDelete={handleRecipeDeleteFromPlan}
            />



            <RecipeSearchInput
                searchText={searchText}
                onSearchTextChange={setSearchText}
            />
            {' '}
            <RecipeCreateButton
                onRecipeCreateClick={handleRecipeCreate}
                disabled={isCreateButtonDisabled()}
                label={"Add To Plan"}
            />

            <RecipeList
                recipes={filteredRecipes}
                onRecipeSelect={handleRecipeAddToPlan}
                onRecipeDelete={handleRecipeDelete}
            />
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
