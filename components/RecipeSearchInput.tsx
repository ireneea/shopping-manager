import {ChangeEventHandler} from "react";


interface AddRecipeFormProps {
    searchText: string
    onSearchTextChange: (searchText: string) => any
}

export const RecipeSearchInput = ({searchText, onSearchTextChange}: AddRecipeFormProps) => {

    const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        const inputValue = event.target.value;
        onSearchTextChange(inputValue);
    }

    return (
        <input
            id="recipe-search"
            type="text"
            placeholder="Search recipe by name"
            value={searchText}
            onChange={handleSearchTextChange}
        />
    )
}
