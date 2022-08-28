import {lowDgStore} from "./low-db";
import {mongodbStore} from "./mongodb";
import {StoreFunctions} from "./models/store-functions.interface";

export * from "./models";
export * from "./low-db";

let store: StoreFunctions;

if (process.env.STORE === 'mongodb') {
    console.log("using mongodb")
    store = mongodbStore
} else if (process.env.STORE === 'lowdb') {
    console.log("using lowdb")
    store = lowDgStore
} else {
    console.log("using lowdb")
    store = lowDgStore
}

export const shoppingManagerStore = store;
