import {NextPage, GetStaticProps} from "next";

import PageLayout from "../components/PageLayout/PageLayout";
import {RecipeModel} from "../store/models/recipe.model";
import {findAllRecipes} from "../store/store-functions/find-all-recipes";
import {AddRecipeForm} from "../components/AddRecipeForm/AddRecipeForm";
import {useRouter} from "next/router";
import {RecipeList} from "../components/RecipeList/RecipeList";

interface RecipesPros {
    recipes: RecipeModel[]
}

const Recipes: NextPage<RecipesPros> = ({recipes}) => {
    const router = useRouter();

    const refreshData = async () => {
        await router.replace((router.asPath));
    }

    const onAddRecipe = async (recipeName: string) => {
        const response = await fetch("/api/recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: recipeName})
        });

        if (response.status < 300) {
            refreshData();
        }
    };

    return (
        <PageLayout pageTitle="Recipes">
            <AddRecipeForm onFormSubmit={onAddRecipe}/>
            <RecipeList recipes={recipes} />
        </PageLayout>
    )
};

export const getStaticProps: GetStaticProps = async () => {
    const recipes = await findAllRecipes();
    return {
        props: {
            recipes,
        }
    }
}

export default Recipes;
