import {RecipeLabelModel, RecipeModel} from "@store";
import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee, faPen, faTrash} from '@fortawesome/free-solid-svg-icons'

import styles from './RecipeList.module.scss';

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

    const renderLabels = (labels?: RecipeLabelModel[]) => {
        if (!labels || !labels.length) {
            return null;
        }

        return (
            <div className={styles.labels}>
                {labels.map((label) => <span key={label.id}>{label.name}</span>)}
            </div>
        )
    }

    return (
        <div className={`callout flex-container align-middle align-justify ${styles.recipeItem}`}>
            <div className={``}>
                <h4>{recipe.name}</h4>
                {renderLabels(recipe.labels)}
            </div>
            <div className={`${styles.recipeActions}`}>
                {onRecipeSelect && (
                    <button
                        onClick={() => onRecipeSelect(recipe)}
                        className="hollow button"
                    >
                        <FontAwesomeIcon icon={faCoffee}/>
                    </button>
                )}

                <Link href={`/recipes/${recipe.id}`}>
                    <a className="hollow button">
                        <FontAwesomeIcon icon={faPen}/>
                    </a>
                </Link>

                {onRecipeDelete && (
                    <button
                        onClick={() => onRecipeDelete && onRecipeDelete(recipe.id)}
                        className="hollow button alert"
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                )}
            </div>
        </div>
    )
}

export const RecipeList = (props: RecipeListProps) => {
    const {
        recipes,
        onRecipeSelect,
        onRecipeDelete,
    } = props;

    return (
        <div className={`grid-x ${styles.recipeList}`}>
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
