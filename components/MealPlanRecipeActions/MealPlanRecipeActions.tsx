import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faTrash} from "@fortawesome/free-solid-svg-icons";

import styles from "./MealPlanRecipeActions.module.scss";

interface MealPlanRecipeActions {
    onRecipeDelete: () => any;
    onRecipeMoveUp: () => any;
    moveUpDisabled?: boolean;
    onRecipeMoveDown: () => any;
    moveDownDisabled?: boolean;
}

export const MealPlanActions = (props: MealPlanRecipeActions) => {

    const {
        onRecipeDelete,
        onRecipeMoveUp,
        moveUpDisabled = false,
        onRecipeMoveDown,
        moveDownDisabled = false,
    } = props;

    return (
        <div className={`${styles.mealPlanActions}`}>
            <button
                onClick={onRecipeDelete}
                className={`hollow button alert`}
            >
                <FontAwesomeIcon icon={faTrash}/>
            </button>
            <button
                onClick={onRecipeMoveUp}
                className="hollow button"
                disabled={moveUpDisabled}
            >
                <FontAwesomeIcon icon={faArrowUp}/>
            </button>
            <button
                onClick={onRecipeMoveDown}
                className="hollow button"
                disabled={moveDownDisabled}
            >
                <FontAwesomeIcon icon={faArrowDown}/>
            </button>
        </div>
    )
}