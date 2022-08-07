import {StoreModel} from "@store";

export const seedData: StoreModel = {
    recipes: [
        {
            id: "8059fc9f-23c4-4f94-9bb6-6daea5feb644",
            name: "Harrisa Burgul Bake",
        },
        {
            id: "a8a82878-587d-41b2-8cd5-46f018a3b059",
            name: "Mushroom bok choy bean",
        },
        {
            id: "ea35cd72-5233-46de-8331-becec9a7a4d0",
            name: "Lemon pea gnocchi",
        },
        {
            id: "5eedb9f2-ba2a-442b-8812-0d4f6a2a6b56",
            name: "Halloumi Satay",
        },
        {
            id: "9ba7b7cc-6e28-48fb-8216-a687cfeb1a23",
            name: "Monstrone Orzo",
        },
        {
            id: "a18521e2-81ca-40d0-9040-b6f89e6d0749",
            name: "Salmon & Kale",
        },
        {
            id: "9b9b0180-1fbf-4fe7-8714-2a3b070e2dc2",
            name: "Mushroom risotto",
        },
        {
            id: "6c9bc971-b739-4d19-af2e-e670e0db4b9d",
            name: "Toastie",
        },
        {
            id: "ccbd42f0-b327-4a90-8383-b3cdb8421191",
            name: "Tomato Feta Pasta",
        },
        {
            id: "a9a65e5d-f683-4b2b-8059-7f72e3883dfb",
            name: "Stir Fry",
        },
        {
            id: "2c06acbd-c79c-470c-81f3-546970d1c3b0",
            name: "Moules Frittes",
        },
    ],
    mealPlans: [
        {
            id: "A04B2C78-6CA9-41FF-A0D2-68FCFD28C6A6",
            name: "My Plan",
            recipes: [
                {
                    id: "E47CF218-4985-46B9-B548-BBB6D9010590",
                    recipeId: "8059fc9f-23c4-4f94-9bb6-6daea5feb644",
                    name: "Harrisa Burgul Bake",
                },
                {
                    id: "F5E121EA-66AE-403C-B25C-65888D9C4D75",
                    recipeId: "2c06acbd-c79c-470c-81f3-546970d1c3b0",
                    name: "Moules Frittes",
                },
            ],
        },
    ],
    "recipeLabels": [
        {
            "id": "c8bb1a83-6e5c-41df-bc7e-f057907ff866",
            "name": "Breakfast"
        },
        {
            "id": "ebc0c238-8a81-4618-9e0c-eeaf70666827",
            "name": "Brunch"
        },
        {
            "id": "85214702-320c-4c71-977a-2a325425df94",
            "name": "Lunch"
        },
        {
            "id": "9be32193-9697-4cb4-ad6f-2857674f3479",
            "name": "Snack"
        },
        {
            "id": "c90eb6ce-4e52-4f0a-8158-a9fd12ca7578",
            "name": "Dinner"
        }
    ]
};
