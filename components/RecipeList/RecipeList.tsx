import {RecipeModel} from "../../store/models/recipe.model";

interface RecipeListProps {
    recipes: RecipeModel[];
    onRecipeDelete?: (recipe: RecipeModel) => any;
}


export const RecipeList = ({ recipes, onRecipeDelete }: RecipeListProps) => {
    return (
        <ul>
            {recipes.map(recipe => (
                <>
                    <li key={recipe.id}>
                        {recipe.name}
                        {' '}
                        {
                            onRecipeDelete &&
                            <button onClick={() => onRecipeDelete && onRecipeDelete(recipe)}>Delete</button>
                        }
                    </li>

                </>
            ))}
        </ul>
    )
};