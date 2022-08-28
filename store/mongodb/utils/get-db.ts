import {MongoClient} from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined: cannot connect to the database")
}

if (!process.env.MONGODB_DATABASE) {
    throw new Error("MONGODB_DATABASE is not defined: cannot connect to the database")
}

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export const getDb = async () => {
    return (await clientPromise).db(process.env.MONGODB_DATABASE);
}