import {Labels, RecipeActions} from "@components";
import {RecipeModel} from "@store";

import styles from "./RecipeListIem.module.scss"


interface RecipeListItemProps {
    recipe: RecipeModel;
    onRecipeDelete?: () => any;
    onRecipeSelect?: () => any;
}

export const RecipeListItem = (props: RecipeListItemProps) => {
    const {
        recipe,
        onRecipeSelect,
        onRecipeDelete
    } = props;


    return (
        <div className={`callout flex-container align-middle align-justify ${styles.recipeActions}`}>
            <div className={``}>
                <h4>{recipe.name}</h4>
                <Labels labels={recipe.labels}/>
            </div>

            <RecipeActions
                recipeId={recipe.id}
                onRecipeSelect={onRecipeSelect}
                onRecipeDelete={onRecipeDelete}
            />

        </div>
    )
}