import { RecipeModel } from "@store";

interface RecipeListProps {
  recipes: RecipeModel[];
  onRecipeDelete?: (recipeId: string) => any;
  onRecipeSelect?: (recipe: RecipeModel) => any;
  onRecipeMoveUp?: (recipeId: string) => any;
  onRecipeMoveDown?: (recipeId: string) => any;
}

export const RecipeList = ({
  recipes,
  onRecipeSelect,
  onRecipeDelete,
  onRecipeMoveUp,
  onRecipeMoveDown,
}: RecipeListProps) => {
  return (
    <ul>
      {recipes.map((recipe, index) => (
        <li key={recipe.id}>
          {recipe.name}
          {onRecipeSelect && (
            <>
              {" "}
              <button
                onClick={() => onRecipeSelect(recipe)}
                className="button tiny"
              >
                Select Recipe
              </button>
            </>
          )}
          {onRecipeDelete && (
            <>
              {" "}
              <button
                onClick={() => onRecipeDelete && onRecipeDelete(recipe.id)}
                className="button tiny alert"
              >
                Delete
              </button>
            </>
          )}
          {onRecipeMoveUp && index > 0 && (
            <>
              {" "}
              <button
                onClick={() => onRecipeMoveUp && onRecipeMoveUp(recipe.id)}
                className="button tiny secondary"
              >
                Up
              </button>
            </>
          )}
          {onRecipeMoveDown && index < recipes.length - 1 && (
            <>
              {" "}
              <button
                onClick={() => onRecipeMoveDown && onRecipeMoveDown(recipe.id)}
                className="button tiny secondary"
              >
                Down
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
