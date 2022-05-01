import {ChangeEventHandler, MouseEventHandler, useEffect, useState} from "react";


interface AddRecipeFormProps {
    onRecipeCreate?: (recipeName: string) => Promise<any>
    onSearchTextChange?: (searchText: string) => any
}

export const RecipeSearch = ({onRecipeCreate, onSearchTextChange}: AddRecipeFormProps) => {
    const [searchText, setSearchText] = useState<string>("");


    useEffect(() => {
        onSearchTextChange && onSearchTextChange(searchText)
    }, [searchText])

    const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        const inputValue = event.target.value;
        setSearchText(inputValue);
    }

    const handleRecipeCreate: MouseEventHandler<HTMLButtonElement>=  (event) => {
        event.preventDefault();
        setSearchText("");
        onRecipeCreate && onRecipeCreate(searchText);
    }


    const isCreateButtonDisabled = () => {
        return !searchText
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

        </div>
    )
}
