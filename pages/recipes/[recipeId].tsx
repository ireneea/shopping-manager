import {GetServerSideProps, NextPage} from "next";
import {PageLayout} from "@components";

import {RecipeLabelModel, RecipeModel} from "@store";
import {ChangeEventHandler, FormEvent, useEffect, useState} from "react";
import {recipeApiClient} from "@services/recipe-api-client";
import {useRouter} from "next/router";
import Link from "next/link";

type LabelsDictionary = { [labelName: string]: boolean }

const setRecipeInput = (recipeLabels: RecipeLabelModel[], allLabels: RecipeLabelModel[]) => {
    const initialInputs: LabelsDictionary = {}
    return allLabels.reduce((acc, val) => {
        acc[val.name] = recipeLabels.some(label => label.name === val.name);
        return acc;
    }, initialInputs)
}

const RecipePage: NextPage = () => {
    const router = useRouter();

    const [labels, setLabels] = useState<RecipeLabelModel[]>([]);
    const [recipe, setRecipe] = useState<RecipeModel>();
    const [recipeName, setRecipeName] = useState<string>("");
    const [recipeLabels, setRecipeLabel] = useState<LabelsDictionary>({});

    const isRecipeFound = !!recipe;

    useEffect(() => {
        const fetchRecipeLabels = async () => {
            const result = await recipeApiClient.findAllRecipeLabels();
            if (result) {
                setLabels(result);
            }
        }

        fetchRecipeLabels().catch(console.error);
    }, []);

    useEffect(() => {
        const fetchRecipe = async () => {
            const {recipeId} = router.query;
            const result = await recipeApiClient.findRecipeById(recipeId as string);
            if (result) {
                setRecipe(result);
            }
        }

        fetchRecipe().catch(console.error);
    }, []);

    useEffect(() => {
        if (recipe) {
            setRecipeName(recipe.name);
            setRecipeLabel(setRecipeInput(recipe.labels ?? [], labels))
        }
    }, [recipe, labels])

    const handleRecipeNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const inputValue = event.target.value;
        setRecipeName(inputValue);
    }

    const handleLabelChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const {name} = event.target;
        setRecipeLabel(prevState => ({...prevState, [name]: !prevState[name]}))
    }

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedRecipe = await recipeApiClient.updateRecipe({
            recipeId: recipe?.id as string, name: recipeName,
            labels: labels.filter(label => recipeLabels[label.name])
        });

        if (updatedRecipe) {
            setRecipe(updatedRecipe);
        }
    }

    return (<PageLayout pageTitle="Recipe">
        {isRecipeFound && (<form onSubmit={handleFormSubmit}>
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
                            checked={recipeLabels[label.name] ?? false}
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
                        type="submit"
                    >
                        Save recipe
                    </button>
                </div>
            </div>


        </form>)}

        <Link href="/">Go back to meal shopping manager</Link>
    </PageLayout>)
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    };
}

export default RecipePage;
