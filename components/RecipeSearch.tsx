import { ChangeEventHandler, MouseEventHandler } from "react";

interface RecipeSearchProps {
  searchText: string;
  onSearchTextChange: (searchText: string) => any;
  onRecipeCreateClick: () => any;
}

export const RecipeSearch = (props: RecipeSearchProps) => {
  const { searchText, onSearchTextChange, onRecipeCreateClick } = props;

  const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    event.preventDefault();
    const inputValue = event.target.value;
    onSearchTextChange(inputValue);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    onRecipeCreateClick();
  };

  return (
    <div className="input-group">
      <input
        id="recipe-search-input"
        className="input-group-field"
        type="text"
        placeholder="Search Recipe"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <div className="input-group-button">
        <button
          id="recipe-add-btn"
          className="button success"
          onClick={handleClick}
          disabled={!searchText}
        >
          Add
        </button>
      </div>
    </div>
  );
};
