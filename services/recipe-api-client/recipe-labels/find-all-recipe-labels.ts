import {RecipeLabelModel} from "@store";
import {BASE_URL} from "@services/recipe-api-client/base-url";
import {HttpMethod} from "@libs/api-utils";
import {DEFAULT_HTTP_HEADER} from "@services/recipe-api-client/default-http-header";

export const findAllRecipeLabels = async () => {
    const response = await fetch(
        `${BASE_URL}/recipe-labels`,
        {
            method: HttpMethod.GET,
            ...DEFAULT_HTTP_HEADER,
        }
    );

    if (response.status < 300) {
        return (await response.json()) as RecipeLabelModel[];
    }
}
