import {NextPage, GetStaticProps} from "next";

import PageLayout from "../components/PageLayout/PageLayout";
import {RecipeModel} from "../store/models/recipe.model";
import {findAllRecipes} from "../store/store-functions";
import {AddRecipeForm} from "../components/AddRecipeForm/AddRecipeForm";
import {useRouter} from "next/router";
import {RecipeList} from "../components/RecipeList/RecipeList";

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
    
    const handleRecipeDelete = async (recipe: RecipeModel) => {
        const response = await fetch(`/api/recipes/${recipe.id}`, {
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
