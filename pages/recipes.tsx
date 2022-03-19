import {NextPage, GetStaticProps} from "next";

import PageLayout from "../components/PageLayout/PageLayout";
import {RecipeModel} from "../services/models/recipe.model";
import {findAllRecipes} from "../services/store-functions/find-all-recipes";
import {AddRecipeForm} from "../components/AddRecipeForm/AddRecipeForm";

interface RecipesPros {
    recipes: RecipeModel[]
}

const Recipes: NextPage<RecipesPros> = ({recipes}) => {
    const onAddRecipe = async (recipe: string) => {
        // TODO: call an api endpoint
        return true;
    }
    return (
        <PageLayout pageTitle="Recipes">
            <AddRecipeForm onFormSubmit={onAddRecipe}/>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>{recipe.name}</li>
                ))}
            </ul>
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
