import fs from "fs";
import { Task } from "../models/Task";
import { Tasks } from "../models/Tasks";

const file = "./src/db/data.json";

export const saveDB = (data: Task[]) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

export const readDB = () => {
  if (fs.existsSync(file)) {
    const data = fs.readFileSync(file, { encoding: "utf-8" });
    return data ? JSON.parse(data) : null;
  } else {
    return null;
  }
};
