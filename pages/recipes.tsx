import {NextPage, GetStaticProps} from "next";

import PageLayout from "../components/PageLayout";
import {getRecipes} from "../services/getRecipes";
import {RecipeModel} from "../services/recipe.model";

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
    const recipes = await getRecipes();
    return {
        props: {
            recipes,
        }
    }
}

export default Recipes;
