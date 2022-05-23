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
              <button onClick={() => onRecipeSelect(recipe)}>
                Select Recipe
              </button>
            </>
          )}
          {onRecipeDelete && (
            <>
              {" "}
              <button
                onClick={() => onRecipeDelete && onRecipeDelete(recipe.id)}
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
