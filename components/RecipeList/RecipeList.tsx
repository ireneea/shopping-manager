import {RecipeModel} from "@store";
import {RecipeListItem} from "@components"

interface RecipeListProps {
    recipes: RecipeModel[];
    onRecipeDelete?: (recipeId: string) => any;
    onRecipeSelect?: (recipe: RecipeModel) => any;
}


export const RecipeList = (props: RecipeListProps) => {
    const {
        recipes,
        onRecipeSelect,
        onRecipeDelete,
    } = props;

    return (
        <div className={`grid-x`}>
            {recipes.map((recipe) => (
                <div className="cell" key={recipe.id}>
                    <RecipeListItem
                        recipe={recipe}
                        onRecipeSelect={onRecipeSelect ? () => onRecipeSelect(recipe) : undefined}
                        onRecipeDelete={onRecipeDelete ? () => onRecipeDelete(recipe.id) : undefined}
                    />
                </div>
            ))}
        </div>
    );
};
