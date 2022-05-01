import type {NextPage} from 'next'

import {AddRecipeForm, PageLayout, RecipeList} from "@components";
import {GetStaticProps} from "next";
import {findAllRecipes, RecipeModel} from "@store";
import {useRouter} from "next/router";

interface HomePagePros {
    recipes: RecipeModel[]
}

const API_HEADER = {
    headers: {
        "Content-Type": "application/json"
    }
}

const Home: NextPage<HomePagePros> = ({ recipes}) => {

    const router = useRouter();

    const handleAddRecipeFormSubmit = async (recipeName: string) => {
        const response = await fetch("/api/recipes", {
            method: "POST",
            body: JSON.stringify({name: recipeName}),
            ...API_HEADER
        });

        if (response.status < 300) {
            // trigger reload of the recipes list
            await router.replace((router.asPath));
        }
    };

    const handleRecipeDelete = async (recipeId: string) => {
        const response = await fetch(`/api/recipes/${recipeId}`, {
            method: "DELETE",
            ...API_HEADER
        });

        if (response.status < 300) {
            // trigger reload of the recipes list
            await router.replace((router.asPath));
        }
    }
    return (
        <PageLayout pageTitle="Shopping Manager" isHomePage>
            <div>
                <h2>Meal Planning</h2>

            </div>

            <div>
                <h2>Recipes</h2>

                <AddRecipeForm onFormSubmit={handleAddRecipeFormSubmit}/>
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
