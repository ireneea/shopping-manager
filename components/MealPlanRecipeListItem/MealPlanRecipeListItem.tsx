import {MealPlanRecipeModel} from "@store";
import {MealPlanActions} from "../MealPlanRecipeActions";

interface MealPlanRecipeItemProps {
    recipe: MealPlanRecipeModel;
    onRecipeDelete: () => any;
    onRecipeMoveUp: () => any;
    moveUpDisabled?: boolean;
    onRecipeMoveDown: () => any;
    moveDownDisabled?: boolean;
}

export const MealPlanRecipeListItem = (props: MealPlanRecipeItemProps) => {
    const {
        recipe,
        onRecipeDelete,
        onRecipeMoveUp,
        moveUpDisabled,
        onRecipeMoveDown,
        moveDownDisabled,
    } = props;

    return (
        <div className={`callout flex-container align-middle align-justify`}>
            <h4>{recipe.name}</h4>

            <MealPlanActions
                onRecipeDelete={onRecipeDelete}
                onRecipeMoveUp={onRecipeMoveUp}
                moveUpDisabled={moveUpDisabled}
                onRecipeMoveDown={onRecipeMoveDown}
                moveDownDisabled={moveDownDisabled}
            />

        </div>
    );
};
