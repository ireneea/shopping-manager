import {PageLayout} from "@components";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage} from "next";
import {findAllRecipes, findRecipeById, RecipeModel} from "@store";
import {ChangeEventHandler, useState} from "react";
import {recipeApiClient} from "@services/recipe-api-client";
import {useRouter} from "next/router";
import Link from "next/link";

type RecipePageParams = {
    recipeId: string
}

type RecipePageProps = {
    recipe: RecipeModel | null
}

const RecipePage: NextPage<RecipePageProps> = ({recipe}) => {
    const router = useRouter();

    const isRecipeFound = !!recipe
    const [recipeName, setRecipeName] = useState<string>(recipe?.name ?? "")

    const handleRecipeNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        const inputValue = event.target.value;
        setRecipeName(inputValue)
    }

    const handleRecipeSave = async () => {
        const updatedRecipe = await recipeApiClient.updateRecipe({
            recipeId: recipe?.id as string,
            name: recipeName
        });

        if (updatedRecipe) {
            await router.replace(router.asPath);
        }
    }

    return (
        <PageLayout pageTitle="Recipe">
            {
                isRecipeFound && (
                    <div>
                        <input
                            id="recipe-name"
                            type="text"
                            value={recipeName}
                            onChange={handleRecipeNameChange}
                        />
                        <button
                            id="recipe-save-btn"
                            className="button success"
                            onClick={handleRecipeSave}
                        >
                            Save recipe
                        </button>
                    </div>
                )
            }

            <Link href="/">Go back to meal shopping manager</Link>
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