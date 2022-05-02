import type {NextPage} from 'next'

import {GetStaticProps} from "next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import {findAllRecipes, RecipeModel} from "@store";
import {
    PageLayout,
    RecipeList,
    RecipeSearchInput,
    RecipeCreateButton
} from "@components";
import {recipeApiClient} from "@services/recipe-api-client";


interface HomePagePros {
    recipes: RecipeModel[]
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

            const addedRecipe = await recipeApiClient.createRecipe(searchText);
            addedRecipe && addRecipeToPlan(addedRecipe);
            setSearchText("");

            await router.replace((router.asPath));
        }
    };

    const handleRecipeAddToPlan = (recipe: RecipeModel) => {
        addRecipeToPlan(recipe)
    }

    const handleRecipeDelete = async (recipeId: string) => {
        await recipeApiClient.deleteRecipe(recipeId);
        await router.replace((router.asPath));
    }

    const handleRecipeDeleteFromPlan = (recipeId: string) => {
        setPlanRecipes(recipes => recipes.filter(r => r.id !== recipeId));
    }

    const addRecipeToPlan = (recipe: RecipeModel) => {
        const mealRecipe: MealPlanRecipe = { id: `${Date.now()}`, name: recipe.name, recipeId: recipe.id}
        setPlanRecipes(recipes => [...recipes, mealRecipe])
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
