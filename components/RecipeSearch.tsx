import {ChangeEventHandler, MouseEventHandler, useEffect, useState} from "react";
import {RecipeModel} from "@store";

const DEFAULT_MAX_SEARCH_RESULT = 5;

interface AddRecipeFormProps {
    onRecipeCreate?: (recipeName: string) => Promise<any>
    recipes: RecipeModel[]
    maxSearchResult?: number;
    onRecipeSelect?: (recipe: RecipeModel) => any
}

export const RecipeSearch = ({onRecipeCreate, recipes, maxSearchResult = DEFAULT_MAX_SEARCH_RESULT, onRecipeSelect}: AddRecipeFormProps) => {
    const [searchText, setSearchText] = useState<string>("");
    const [searchResult, setSearchResult] = useState<RecipeModel[]>([]);

    useEffect(() => {
        if (searchText) {
            const matchingRecipes = recipes
                .filter(recipe => recipe.name.toLowerCase().includes(searchText.toLowerCase()))
            if (matchingRecipes.length > maxSearchResult) {
                setSearchResult(matchingRecipes.slice(0, maxSearchResult))
            } else {
                setSearchResult(matchingRecipes)
            }
        } else {
            setSearchResult([])
        }
    }, [searchText])

    const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        setSearchText(event.target.value);
    }

    const handleRecipeCreate: MouseEventHandler<HTMLButtonElement>=  (event) => {
        event.preventDefault();
        setSearchText("");
        onRecipeCreate && onRecipeCreate(searchText);
    }

    const handleSearchSelect = (recipe: RecipeModel) => {
        setSearchText("")
        onRecipeSelect && onRecipeSelect(recipe)
    }

    const isCreateButtonDisabled = () => {
        return !searchText || searchResult.some(recipe => recipe.name.toLowerCase() === searchText.toLowerCase())
    }

    return (
        <div>

            <input
                id="recipe-search"
                type="text"
                placeholder="Search recipe by name"
                value={searchText}
                onChange={handleSearchTextChange}
            />
            {onRecipeCreate && (
                <>
                    {' '}
                    <button onClick={handleRecipeCreate} disabled={isCreateButtonDisabled()}>
                        Create Recipe
                    </button>
                </>
            )}

            <ul>
                {searchResult.map(recipe => (
                    <li key={recipe.id}>
                        {recipe.name}
                        {onRecipeSelect && (
                            <>
                                {' '}
                                <button onClick={() => handleSearchSelect(recipe)}>
                                    Select Recipe
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
