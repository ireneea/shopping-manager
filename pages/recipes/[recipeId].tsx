import {PageLayout} from "@components";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage} from "next";
import {findAllRecipes, findRecipeById, RecipeModel} from "@store";

type RecipePageParams = {
    recipeId: string
}

type RecipePageProps = {
    recipe: RecipeModel | null
}

const RecipePage: NextPage<RecipePageProps> = ({recipe}) => {
    return (
        <PageLayout pageTitle="Recipe">
            {
                recipe && (
                    <>
                        {recipe.name}
                    </>
                )
            }
        </PageLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const recipes = await findAllRecipes();
    const recipePaths = recipes.map(recipe => ({params: {recipeId: recipe.id}}));
    return {paths: recipePaths, fallback: false};
}

export const getStaticProps: GetStaticProps<RecipePageProps, RecipePageParams> = async (context: GetStaticPropsContext<RecipePageParams>) => {
    const recipeId = context.params?.recipeId;
    const props: RecipePageProps = {recipe: null};

    if (recipeId) {
        props.recipe = await findRecipeById(recipeId);
    }

    return {props}
}


export default RecipePage;