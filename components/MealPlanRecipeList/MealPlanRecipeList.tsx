import styles from "./MealPlanRecipeList.module.scss";
import {MealPlanRecipeModel} from "@store";
import {MealPlanRecipeItem} from "../MealPlanRecipeItem";

interface MealPlanRecipeListProps {
  recipes: MealPlanRecipeModel[];
  onRecipeDelete: (recipeId: string) => any;
  onRecipeMoveUp: (recipeId: string) => any;
  onRecipeMoveDown: (recipeId: string) => any;
}

export const MealPlanRecipeList = (props: MealPlanRecipeListProps) => {
  const {recipes, onRecipeDelete, onRecipeMoveUp, onRecipeMoveDown} = props;

  return (
      <ol className={styles.recipeList}>
        {recipes.map((recipe, index) => (
            <li key={recipe.id}>
              <MealPlanRecipeItem
                  recipe={recipe}
                  onRecipeDelete={() => onRecipeDelete && onRecipeDelete(recipe.id)}
                  onRecipeMoveUp={() => onRecipeMoveUp && onRecipeMoveUp(recipe.id)}
                  moveUpDisabled={index === 0}
                  onRecipeMoveDown={() =>
                      onRecipeMoveDown && onRecipeMoveDown(recipe.id)
                  }
                  moveDownDisabled={index === recipes.length - 1}
              />
            </li>
        ))}
      </ol>
  );
};
