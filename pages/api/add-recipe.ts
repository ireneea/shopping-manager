import {NextApiRequest, NextApiResponse} from "next";
import {RecipeModel} from "../../store/models/recipe.model";
import {addRecipe} from "../../store/store-functions/add-recipe";
import {AddRecipeInput} from "../../store/store-functions/add-recipe-input";


interface Error {
    error: string;
}

const addRecipientHandler = async (req: NextApiRequest, res: NextApiResponse<RecipeModel | Error>) => {
    if (req.method === "POST") {
        const input = req.body as AddRecipeInput;
        const recipe = await addRecipe(input);
        res.status(200).json(recipe);
    } else {
        res.status(405).json({error: "GET method is not allowed"})
    }
}

export default addRecipientHandler;