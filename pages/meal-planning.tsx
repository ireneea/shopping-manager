import {GetStaticProps, NextPage} from "next";
import PageLayout from "../components/PageLayout/PageLayout";
import {ChangeEventHandler, MouseEventHandler, useEffect, useState} from "react";
import {RecipeList} from "../components/RecipeList/RecipeList";
import {findAllRecipes} from "../store/store-functions/find-all-recipes";
import {RecipeModel} from "../store/models/recipe.model";

interface MealPlanningPros {
    recipes: RecipeModel[];
}

const MAX_SEARCH_RESULT = 5;

const MealPlanning: NextPage<MealPlanningPros> = ({recipes}) => {
    const [planRecipes, setPlanRecipes] = useState<RecipeModel[]>([]);
    const [searchResult, setSearchResult] = useState<RecipeModel[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeModel | undefined>()

    useEffect(() => {
        if (searchText) {
            const matchingRecipes = recipes
                .filter(recipe => recipe.name.toLowerCase().includes(searchText))
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

    const onRecipeSelected = (recipe: RecipeModel) => {
        setSearchText("")
        setSelectedRecipe(recipe);
    }

    const onAddRecipe = (recipe: RecipeModel) => {
        setPlanRecipes(recipes => [...recipes, recipe])
    }

    return (
        <PageLayout pageTitle="Meal Planning">
            <h2>Search Recipe</h2>
            <input id="recipe-search" type="string" value={searchText} onChange={handleSearchTextChange}/>
            <ul>
                {searchResult.map(recipe => (
                    <li key={recipe.id}>
                        {recipe.name}
                        <button onClick={() => onRecipeSelected(recipe)}>Select</button>
                    </li>
                ))}
            </ul>

            <h2>Selected Recipe</h2>
            { selectedRecipe && (
                 <div>
                     {selectedRecipe.name}
                     <button onClick={() => onAddRecipe(selectedRecipe)}>Add</button>
                 </div>
            )}

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