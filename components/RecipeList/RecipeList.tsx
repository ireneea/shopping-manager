import {RecipeModel} from "../../store/models/recipe.model";

interface RecipeListProps {
    recipes: RecipeModel[]
}

export const RecipeList = ({ recipes}: RecipeListProps) => {
    return (
        <ul>
            {recipes.map(recipe => (
                <li key={recipe.id}>{recipe.name}</li>
            ))}
        </ul>
    )
};