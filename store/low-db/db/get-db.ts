import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {JSONFile, Low} from "lowdb";

import {StoreModel} from "@store";
import {seedData} from "./seed-data";

export const getDb = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const file = join(__dirname, "db.json");
  const adapter = new JSONFile<StoreModel>(file);
  const db = new Low<StoreModel>(adapter);

  await db.read();

  if (!db.data) {
    db.data = seedData;
    await db.write();
  }

  return db;
};
