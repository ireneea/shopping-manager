import {NextPage} from "next";
import PageLayout from "../components/PageLayout";

const Recipes: NextPage = () => {
    return (
        <PageLayout pageTitle="Recipes">
            <ul>
                <li>Permangiana</li>
                <li>Tomato mozzarella salad</li>
            </ul>
        </PageLayout>
    )
}

export default  Recipes;