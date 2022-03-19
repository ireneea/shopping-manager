import {NextApiRequest, NextApiResponse} from "next";
import {RecipeModel} from "../../store/models/recipe.model";
import {addRecipe} from "../../store/store-functions/add-recipe";
import {AddRecipeInput} from "../../store/store-functions/add-recipe-input";


interface ApiError {
    error: string;
}


const addRecipientHandler = async (req: NextApiRequest, res: NextApiResponse<RecipeModel | ApiError>) => {
    if (req.method === "POST") {
        try {
            const input = req.body as AddRecipeInput;
            const recipe = await addRecipe(input);
            res.status(200).json(recipe);
        } catch (err) {
            res.status(500).json({ error:  (err as any).message|| "Unexpected error"})
        }

    } else {
        res.status(405).json({error: `${req.method} method is not allowed`})
    }
}

export default addRecipientHandler;