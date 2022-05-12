import {RecipeModel} from "@store";

interface RecipeListProps {
    recipes: RecipeModel[];
    onRecipeDelete?: (recipeId: string) => any;
    onRecipeSelect?: (recipe: RecipeModel) => any;
}


export const RecipeList = ({ recipes, onRecipeSelect, onRecipeDelete }: RecipeListProps) => {
    return (
        <ul>
            {recipes.map(recipe => (
                <li key={recipe.id}>
                    {recipe.name}
                    {onRecipeSelect && (
                        <>
                            {' '}
                            <button onClick={() => onRecipeSelect(recipe)}>
                                Select Recipe
                            </button>
                        </>
                    )}
                    {onRecipeDelete && (
                        <>
                            {' '}
                            <button onClick={() => onRecipeDelete && onRecipeDelete(recipe.id)}>Delete</button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    )
};