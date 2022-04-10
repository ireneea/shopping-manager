import {RecipeModel} from "@store";

interface RecipeListProps {
    recipes: RecipeModel[];
    onRecipeDelete?: (recipeId: string) => any;
}


export const RecipeList = ({ recipes, onRecipeDelete }: RecipeListProps) => {
    return (
        <ul>
            {recipes.map(recipe => (
                <li key={recipe.id}>
                    {recipe.name}
                    {' '}
                    {
                        onRecipeDelete &&
                        <button onClick={() => onRecipeDelete && onRecipeDelete(recipe.id)}>Delete</button>
                    }
                </li>
            ))}
        </ul>
    )
};