import {MealPlanRecipeModel} from "@store";
import {MealPlanRecipeListItem} from "../MealPlanRecipeListItem";

interface MealPlanRecipeListProps {
  recipes: MealPlanRecipeModel[];
  onRecipeDelete: (recipeId: string) => any;
  onRecipeMoveUp: (recipeId: string) => any;
  onRecipeMoveDown: (recipeId: string) => any;
}

export const MealPlanRecipeList = (props: MealPlanRecipeListProps) => {
  const {recipes, onRecipeDelete, onRecipeMoveUp, onRecipeMoveDown} = props;

  return (
      <div className={`grid-x`}>
        {recipes.map((recipe, index) => (
            <div className="cell" key={recipe.id}>
              <MealPlanRecipeListItem
                  recipe={recipe}
                  onRecipeDelete={() => onRecipeDelete && onRecipeDelete(recipe.id)}
                  onRecipeMoveUp={() => onRecipeMoveUp && onRecipeMoveUp(recipe.id)}
                  moveUpDisabled={index === 0}
                  onRecipeMoveDown={() =>
                      onRecipeMoveDown && onRecipeMoveDown(recipe.id)
                  }
                  moveDownDisabled={index === recipes.length - 1}
              />
            </div>
        ))}
      </div>
  );
};
