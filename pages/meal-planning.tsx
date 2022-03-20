import {NextPage} from "next";
import PageLayout from "../components/PageLayout/PageLayout";

const MealPlanning:NextPage = () => {
  return (
      <PageLayout pageTitle="Meal Planning">
        <ul>
            <li>Search recipe</li>
            <li>Add the recipe to the meal plan</li>
        </ul>
      </PageLayout>
  )
}

export default MealPlanning;