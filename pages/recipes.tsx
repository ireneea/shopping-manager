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

    const onAddRecipe = async (recipeName: string) => {
        const response = await fetch("/api/recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: recipeName})
        });

        if (response.status < 300) {
            // trigger reload of the recipes list
            await router.replace((router.asPath));
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
    // TODO: handle fetch error
    return {
        props: {
            recipes,
        }
    }
}

export default Recipes;
