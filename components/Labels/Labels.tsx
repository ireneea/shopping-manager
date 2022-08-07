import {RecipeLabelModel} from "@store";
import styles from "./Labels.module.scss";

interface LabelsProps {
    labels?: RecipeLabelModel[]
}

export const Labels = ({labels}: LabelsProps) => {
    if (!labels || !labels.length) {
        return null;
    }

    return (
        <div className={styles.labels}>
            {labels.map((label) => <span key={label.id}>{label.name}</span>)}
        </div>
    )
}