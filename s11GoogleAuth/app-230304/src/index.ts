import { Server } from "./models/Server";
import { config } from "dotenv";
import path from "path";

config();

const server = new Server();
server.listen();
