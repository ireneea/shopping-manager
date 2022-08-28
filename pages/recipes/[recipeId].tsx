import {PageLayout} from "@components";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage} from "next";
import {RecipeLabelModel, RecipeModel, shoppingManagerStore} from "@store";
import {ChangeEventHandler, useState} from "react";
import {recipeApiClient} from "@services/recipe-api-client";
import {useRouter} from "next/router";
import Link from "next/link";

type RecipePageParams = {
    recipeId: string
}

type RecipePageProps = {
    recipe: RecipeModel | null
    labels: RecipeLabelModel[]
}

type LabelsDictionary = { [labelName: string]: boolean }

const setRecipeInput = (recipeLabels: RecipeLabelModel[], allLabels: RecipeLabelModel[]) => {
    const initialInputs: LabelsDictionary = {}
    return allLabels.reduce((acc, val) => {
        acc[val.name] = recipeLabels.some(label => label.name === val.name);
        return acc;
    }, initialInputs)
}


const RecipePage: NextPage<RecipePageProps> = ({recipe, labels}) => {
    const router = useRouter();

    const isRecipeFound = !!recipe
    const [recipeName, setRecipeName] = useState<string>(recipe?.name ?? "")
    const [recipeLabels, setRecipeLabel] = useState<LabelsDictionary>(setRecipeInput(recipe?.labels ?? [], labels ?? []))


    const handleRecipeNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const inputValue = event.target.value;
        setRecipeName(inputValue)
    }

    const handleLabelChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const {name} = event.target;
        setRecipeLabel(prevState => ({...prevState, [name]: !prevState[name]}))
    }

    const handleRecipeSave = async () => {
        const updatedRecipe = await recipeApiClient.updateRecipe({
            recipeId: recipe?.id as string, name: recipeName,
            labels: labels.filter(label => recipeLabels[label.name])
        });

        if (updatedRecipe) {
            await router.replace(router.asPath);
        }
    }

    return (<PageLayout pageTitle="Recipe">
        {isRecipeFound && (<form>
            <div className="row">
                <div className="large-12 columns">
                    <label>
                        Recipe Name
                        <input
                            id="recipe-name"
                            type="text"
                            name="name"
                            value={recipeName}
                            onChange={handleRecipeNameChange}
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="large-12 columns">
                    <label>Labels</label>
                    {labels.map((label: RecipeLabelModel) => (<span key={`${label.name}-${label.id}`}>
                        <input
                            id={`${label.name}-${label.id}`}
                            name={label.name}
                            onChange={handleLabelChange}
                            checked={recipeLabels[label.name]}
                            type="checkbox"
                        />
                        <label htmlFor={`${label.name}-${label.id}`}>{label.name}</label>
                    </span>))}
                </div>
            </div>

            <div className="row">
                <div className="large-12 columns">
                    <button
                        id="recipe-save-btn"
                        className="button success"
                        onClick={handleRecipeSave}
                    >
                        Save recipe
                    </button>
                </div>
            </div>


        </form>)}

        <Link href="/">Go back to meal shopping manager</Link>
    </PageLayout>)
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    const {} = context
    const recipes = await shoppingManagerStore.recipe.findAllRecipes();
    const recipePaths = recipes.map(recipe => ({params: {recipeId: recipe.id}}));
    console.log({recipePaths})
    return {paths: recipePaths, fallback: true};
}

export const getStaticProps: GetStaticProps<RecipePageProps, RecipePageParams> = async (context: GetStaticPropsContext<RecipePageParams>) => {
    const recipeId = context.params?.recipeId;
    const labels = await shoppingManagerStore.recipeLabel.findAllRecipeLabels();
    const props: RecipePageProps = {
        recipe: null, labels
    };

    if (recipeId) {
        props.recipe = await shoppingManagerStore.recipe.findRecipeById(recipeId);
    }

    return {props}
}

export default RecipePage;
