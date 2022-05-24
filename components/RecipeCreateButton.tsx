import { MouseEventHandler } from "react";

interface RecipeCreateButtonProps {
  onRecipeCreateClick: () => any;
  disabled?: boolean;
  label?: string;
}

export const RecipeCreateButton = (props: RecipeCreateButtonProps) => {
  const { label = "Create Recipe", onRecipeCreateClick, disabled } = props;

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    onRecipeCreateClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="button success"
    >
      {label}
    </button>
  );
};
