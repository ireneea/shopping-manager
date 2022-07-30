import {MealPlanRecipeModel} from "@store";

import styles from "./MealPlanRecipeItem.module.scss";

interface MealPlanRecipeItemProps {
  recipe: MealPlanRecipeModel;
  onRecipeDelete: () => any;
  onRecipeMoveUp: () => any;
  moveUpDisabled?: boolean;
  onRecipeMoveDown: () => any;
  moveDownDisabled?: boolean;
}

export const MealPlanRecipeItem = (props: MealPlanRecipeItemProps) => {
  const {
    recipe,
    onRecipeDelete,
    onRecipeMoveUp,
    moveUpDisabled = false,
    onRecipeMoveDown,
    moveDownDisabled = false,
  } = props;

  return (
      <div className="clearfix">
        <button
            onClick={onRecipeDelete}
            className={`button tiny alert float-left ${styles.deleteButton}`}
        >
          &#10005;
        </button>
        {recipe.name}
        <div
            className={`tiny button-group float-right ${styles.sortingButtonGroup}`}
        >
          <button
              onClick={onRecipeMoveUp}
              className="button"
              disabled={moveUpDisabled}
          >
            &uarr;
          </button>
          <button
              onClick={onRecipeMoveDown}
              className="button"
              disabled={moveDownDisabled}
          >
            &darr;
          </button>
        </div>
      </div>
  );
};
