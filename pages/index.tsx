import type {NextPage} from 'next'

import {GetStaticProps} from "next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import {findAllMealPlans, findAllRecipes, MealPlanRecipeModel, RecipeModel, MealPlanModel} from "@store";
import {recipeApiClient} from "@services/recipe-api-client";
import {
    PageLayout,
    RecipeList,
    RecipeSearchInput,
    RecipeCreateButton
} from "@components";

interface HomePagePros {
    recipes: RecipeModel[],
    mealPlan: MealPlanModel
}

const Home: NextPage<HomePagePros> = ({ recipes, mealPlan}) => {
    const router = useRouter();

    const [planRecipes, setPlanRecipes] = useState<MealPlanRecipeModel[]>(mealPlan.recipes);
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

    const handleRecipeDelete = async (recipeId: string) => {
        await recipeApiClient.deleteRecipe(recipeId);
        await router.replace((router.asPath));
    }

    const handleRecipeAddToPlan = async (recipe: RecipeModel) => {
        const plan = await recipeApiClient.addRecipeToMealPlan({
            mealPlanId: mealPlan.id,
            recipe
        });

        if (plan) {
            setPlanRecipes(plan.recipes);
        }
    }

    const handleRecipeDeleteFromPlan = (recipeId: string) => {
        setPlanRecipes(recipes => recipes.filter(r => r.id !== recipeId));
    }

    const addRecipeToPlan = (recipe: RecipeModel) => {
        const mealRecipe: MealPlanRecipeModel = { id: `${Date.now()}`, name: recipe.name, recipeId: recipe.id}
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
    const mealPlans = await findAllMealPlans();
    return {
        props: {
            recipes,
            mealPlan: mealPlans[0]
        }
    }
}

export default Home
