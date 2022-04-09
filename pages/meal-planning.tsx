import {GetStaticProps, NextPage} from "next";
import PageLayout from "../components/PageLayout/PageLayout";
import {ChangeEventHandler, useEffect, useState} from "react";
import {RecipeList} from "../components/RecipeList/RecipeList";
import {findAllRecipes} from "../store/store-functions";
import {RecipeModel} from "../store/models/recipe.model";
import {useRouter} from "next/router";

interface MealPlanRecipe {
    id: string;
    recipeId: string;
    name: string;
}
interface MealPlanningPros {
    recipes: RecipeModel[];
}

const MAX_SEARCH_RESULT = 5;

const MealPlanning: NextPage<MealPlanningPros> = ({recipes}) => {
    const [planRecipes, setPlanRecipes] = useState<MealPlanRecipe[]>([]);
    const [searchResult, setSearchResult] = useState<RecipeModel[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        if (searchText) {
            const matchingRecipes = recipes
                .filter(recipe => recipe.name.toLowerCase().includes(searchText.toLowerCase()))
            if (matchingRecipes.length > MAX_SEARCH_RESULT) {
                setSearchResult(matchingRecipes.slice(0, MAX_SEARCH_RESULT))
            } else {
                setSearchResult(matchingRecipes)
            }
        } else {
            setSearchResult([])
        }
    }, [searchText])

    const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        setSearchText(event.target.value)
    }


    const onAddRecipeToPlan = (recipe: RecipeModel) => {
        setSearchText("")
        const mealRecipe: MealPlanRecipe = { id: `${Date.now()}`, name: recipe.name, recipeId: recipe.id}
        setPlanRecipes(recipes => [...recipes, mealRecipe])
    }

    const onCreateRecipe = async (recipeName: string) => {
        const response = await fetch("/api/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: recipeName})
        });

        if (response.status < 300) {
            await router.replace((router.asPath));
            const addedRecipe: RecipeModel = await response.json()
            onAddRecipeToPlan(addedRecipe);
        } else {
            // TODO: handle error
        }
    }

    const canShowCreateRecipeButton = () => {
      return searchText && !searchResult.length
    }

    return (
        <PageLayout pageTitle="Meal Planning">
            <h2>Search Recipe</h2>
            <input id="recipe-search" type="string" value={searchText} onChange={handleSearchTextChange}/>
            {canShowCreateRecipeButton() && (
                <>
                    {' '}
                    <button onClick={() => onCreateRecipe(searchText)}>Create Recipe</button>
                </>
            )}

            <ul>
                {searchResult.map(recipe => (
                    <li key={recipe.id}>
                        {recipe.name}
                        {' '}
                        <button onClick={() => onAddRecipeToPlan(recipe)}>Add to meal plan</button>
                    </li>
                ))}
            </ul>

            <h2>Meal Plan</h2>
            <RecipeList recipes={planRecipes}/>
        </PageLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const recipes = await findAllRecipes();
    // TODO: handle fetch error
    return {
        props: {
            recipes,
        }
    }
}

export default MealPlanning;