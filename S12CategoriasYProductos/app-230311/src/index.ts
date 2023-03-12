import Server from "./models/Server";
import dotenv from "dotenv";

dotenv.config();

const server = new Server();
server.listen();
