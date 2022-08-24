import {lowDgStore} from "./low-db";

export * from "./models";
export * from "./low-db";

let store;

if (process.env.STORE === 'mongodb') {
    store = lowDgStore
} else if (process.env.STORE === 'lowdb') {
    store = lowDgStore
} else {
    store = lowDgStore
}

export const shoppingManagerStore = store;
