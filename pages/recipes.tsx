import {NextPage, GetStaticProps} from "next";
import {useRouter} from "next/router";

import {RecipeModel, findAllRecipes} from "@store";
import {AddRecipeForm, PageLayout, RecipeList} from "@components";

interface RecipesPros {
    recipes: RecipeModel[]
}

const API_HEADER = {
    headers: {
        "Content-Type": "application/json"
    }
}

const Recipes: NextPage<RecipesPros> = ({recipes}) => {
    const router = useRouter();

    const handleFormSubmit = async (recipeName: string) => {
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
        <PageLayout pageTitle="Recipes">
            <AddRecipeForm onFormSubmit={handleFormSubmit}/>
            <RecipeList recipes={recipes} onRecipeDelete={handleRecipeDelete}/>
        </PageLayout>
    )
};

export const getStaticProps: GetStaticProps = async () => {
    const recipes = await findAllRecipes();
    // TODO: handle fetch error
    return {
        props: {
            recipes,
        }
    }
}

export default Recipes;
