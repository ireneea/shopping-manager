import type {NextPage} from "next";
import {GetStaticProps} from "next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import {MealPlanModel, MealPlanRecipeModel, RecipeModel, shoppingManagerStore,} from "@store";
import {recipeApiClient} from "@services/recipe-api-client";
import {MealPlanRecipeList, PageLayout, RecipeList, RecipeSearch} from "@components";

interface HomePagePros {
  recipes: RecipeModel[];
  mealPlan: MealPlanModel;
}

function move<T>(from: number, to: number, arr: T[]): T[] {
  const isIndexValid = (index: number, arrLength: number) =>
      index >= 0 && index < arrLength;

  if (
    !isIndexValid(from, arr.length) ||
    !isIndexValid(to, arr.length) ||
    from === to
  ) {
    return arr;
  }

  const newArr = [...arr];

  const item = newArr.splice(from, 1)[0];
  newArr.splice(to, 0, item);

  return newArr;
}

const Home: NextPage<HomePagePros> = ({ recipes, mealPlan }) => {
  const router = useRouter();

  const [searchText, setSearchText] = useState<string>("");

  const [filteredRecipes, setFilteredRecipes] = useState<RecipeModel[]>(recipes);

  useEffect(() => {
    if (searchText) {
      const matchingRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRecipes(matchingRecipes);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchText, recipes]);

  const handleRecipeCreate = async () => {
    if (searchText) {
      const addedRecipe = await recipeApiClient.createRecipe(searchText);

      if (addedRecipe) {
        await handleRecipeAddToPlan(addedRecipe);
        setSearchText("");
        await router.replace(router.asPath);
      }
    }
  };

  const handleRecipeDelete = async (recipeId: string) => {
    await recipeApiClient.deleteRecipe(recipeId);
    await router.replace(router.asPath);
  };

  const handleRecipeAddToPlan = async (recipe: RecipeModel) => {
    const plan = await recipeApiClient.addRecipeToMealPlan({
      mealPlanId: mealPlan.id,
      recipe,
    });

    if (plan) {
      setSearchText("");
      await router.replace(router.asPath);
    }
  };

  const handleRecipeDeleteFromPlan = async (recipeId: string) => {
    const plan = await recipeApiClient.deleteRecipeFromMealPlan({
      mealPlanId: mealPlan.id,
      mealPlanRecipeId: recipeId,
    });

    if (plan) {
      await router.replace(router.asPath);
    }
  };

  const handleRecipeMoveUp = async (recipeId: string) => {
    const index = mealPlan.recipes.findIndex(
      (recipe) => recipe.id === recipeId
    );
    const recipesIds = move<MealPlanRecipeModel>(
      index,
      index - 1,
      mealPlan.recipes
    ).map((r) => r.id);
    const plan = await recipeApiClient.reOrderMealPlanRecipes({
      mealPlanId: mealPlan.id,
      recipesIds,
    });

    if (plan) {
      await router.replace(router.asPath);
    }
  };

  const handleRecipeMoveDown = async (recipeId: string) => {
    const index = mealPlan.recipes.findIndex(
      (recipe) => recipe.id === recipeId
    );
    const recipesIds = move<MealPlanRecipeModel>(
      index,
      index + 1,
      mealPlan.recipes
    ).map((r) => r.id);
    const plan = await recipeApiClient.reOrderMealPlanRecipes({
      mealPlanId: mealPlan.id,
      recipesIds,
    });

    if (plan) {
      await router.replace(router.asPath);
    }
  };

  return (
      <PageLayout pageTitle="Meal Shopping Manager">
        <RecipeSearch
            searchText={searchText}
            onSearchTextChange={setSearchText}
            onRecipeCreateClick={handleRecipeCreate}
        />

        {searchText ? (
            <RecipeList
                recipes={filteredRecipes}
                onRecipeSelect={handleRecipeAddToPlan}
        />
      ) : (
            <MealPlanRecipeList
                recipes={mealPlan.recipes}
                onRecipeDelete={handleRecipeDeleteFromPlan}
                onRecipeMoveUp={handleRecipeMoveUp}
                onRecipeMoveDown={handleRecipeMoveDown}
            />
      )}

      <hr />
      <h2>Recipes</h2>
      <RecipeList
        recipes={recipes}
        onRecipeSelect={handleRecipeAddToPlan}
        onRecipeDelete={handleRecipeDelete}
      />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await shoppingManagerStore.recipe.findAllRecipes();
  const mealPlans = await shoppingManagerStore.mealPlan.findAllMealPlans();
  return {
    props: {
      recipes,
      mealPlan: mealPlans[0],
    },
  };
};

export default Home;
