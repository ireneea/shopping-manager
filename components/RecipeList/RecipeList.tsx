import {RecipeModel} from "@store";
import Link from "next/link";

interface RecipeListProps {
    recipes: RecipeModel[];
    onRecipeDelete?: (recipeId: string) => any;
    onRecipeSelect?: (recipe: RecipeModel) => any;
}

interface RecipeItemProps {
    recipe: RecipeModel;
    onRecipeDelete?: (recipeId: string) => any;
    onRecipeSelect?: (recipe: RecipeModel) => any;
}

const RecipeItem = (props: RecipeItemProps) => {
    const {
        recipe,
        onRecipeSelect,
        onRecipeDelete
    } = props;

    return <div className="card">
        <div className="card-section">
            <h4>
                <Link href={`/recipes/${recipe.id}`}>
                    {recipe.name}
                </Link>
            </h4>
        </div>

        {
            recipe.labels?.length && <div className="card-section">
                {recipe.labels?.map(label => (<span className="label secondary radius">{label.name}</span>))}
            </div>
        }

        <div className="card-divider">
            <div>
                {onRecipeSelect && (
                    <button
                        onClick={() => onRecipeSelect(recipe)}
                        className="button tiny success"
                    >
                        ➕ Add
                    </button>
                )}

                <Link href={`/recipes/${recipe.id}`}>
                    <a className="button tiny">✏️ Edit</a>
                </Link>

                {onRecipeDelete && (
                    <button
                        onClick={() => onRecipeDelete && onRecipeDelete(recipe.id)}
                        className="button tiny alert"
                    >
                        🗑 Delete
                    </button>
                )}
            </div>
        </div>
    </div>
}

export const RecipeList = (props: RecipeListProps) => {
    const {
        recipes,
        onRecipeSelect,
        onRecipeDelete,
    } = props;

    return (
        <div className="grid-x grid-padding-x small-up-1 medium-up-2 large-up-3">
            {recipes.map((recipe) => (
                <div className="cell" key={recipe.id}>
                    <RecipeItem
                        recipe={recipe}
                        onRecipeSelect={onRecipeSelect}
                        onRecipeDelete={onRecipeDelete}
                    />
                </div>
            ))}
        </div>
    );
};
