import { Server } from "./models/server";
import { config } from "dotenv";
import path from "path";

config();

const server = new Server();
server.listen();
