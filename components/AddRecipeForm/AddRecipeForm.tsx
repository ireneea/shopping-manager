import {ChangeEventHandler, FormEventHandler, useState} from "react";

interface AddRecipeFormProps {
    onFormSubmit: (recipeName: string) => Promise<any>
}


export const AddRecipeForm = ({onFormSubmit}: AddRecipeFormProps) => {
    const [recipeName, setRecipeName] = useState("");

    const handleRecipeNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        // TODO: clear submission feedback message
        event.preventDefault();
        setRecipeName(event.target.value);
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        try {
            event.preventDefault();
            await onFormSubmit(recipeName);
            setRecipeName("");
            // TODO display submission success message
        } catch (e) {
            // TODO: display submission error message
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    id="recipe-name"
                    type="text"
                    placeholder="Enter recipe name"
                    name="recipeName"
                    value={recipeName}
                    onChange={handleRecipeNameChange}
                />

                <button type="submit">
                    Add Recipe
                </button>
            </form>
        </div>
    )
}
