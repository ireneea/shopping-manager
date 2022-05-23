import type {NextPage} from 'next'

import {GetStaticProps} from "next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import {findAllMealPlans, findAllRecipes, RecipeModel, MealPlanModel} from "@store";
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

            if (addedRecipe) {
                await handleRecipeAddToPlan(addedRecipe);
                setSearchText("");
                await router.replace((router.asPath));
            }
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
            await router.replace((router.asPath));
        }
    }

    const handleRecipeDeleteFromPlan = async (recipeId: string) => {
        const plan = await recipeApiClient.deleteRecipeFromMealPlan({
            mealPlanId: mealPlan.id,
            mealPlanRecipeId: recipeId
        });

        if (plan) {
            await router.replace((router.asPath));
        }
    }


    const isCreateButtonDisabled = () => {
        return !searchText
    }

    return (
        <PageLayout pageTitle="Shopping Manager" isHomePage>
            <RecipeList
                recipes={mealPlan.recipes}
                onRecipeDelete={handleRecipeDeleteFromPlan}
                onRecipeMoveUp={(recipeId => {
                    console.log(recipeId)
                })}
                onRecipeMoveDown={(recipeId => {
                    console.log(recipeId)
                })}
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
