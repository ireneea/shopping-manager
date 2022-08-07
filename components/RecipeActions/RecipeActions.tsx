import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import styles from "./RecipeActions.module.scss"

interface RecipeActionsProps {
    recipeId: string
    onRecipeDelete?: () => any;
    onRecipeSelect?: () => any;
}

export const RecipeActions = (props: RecipeActionsProps) => {

    const {
        recipeId,
        onRecipeSelect,
        onRecipeDelete
    } = props;

    return (
        <div className={`${styles.recipeActions}`}>
            {onRecipeSelect && (
                <button
                    onClick={() => onRecipeSelect()}
                    className="hollow button"
                >
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            )}

            <Link href={`/recipes/${recipeId}`}>
                <a className="hollow button">
                    <FontAwesomeIcon icon={faPen}/>
                </a>
            </Link>

            {onRecipeDelete && (
                <button
                    onClick={() => onRecipeDelete && onRecipeDelete()}
                    className="hollow button alert"
                >
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            )}
        </div>
    )
}