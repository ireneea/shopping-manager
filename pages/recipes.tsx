import {NextPage, GetStaticProps} from "next";

import PageLayout from "../components/PageLayout";
import {RecipeModel} from "../services/models/recipe.model";
import {findAllRecipes} from "../services/store-functions/find-all-recipes";

interface RecipesPros {
    recipes: RecipeModel[]
}

const Recipes: NextPage<RecipesPros> = ({recipes}) => {
    return (
        <PageLayout pageTitle="Recipes">
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
