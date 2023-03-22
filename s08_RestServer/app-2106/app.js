const Server = require("./models/server");

// 100, 101
require("dotenv").config();

const server = new Server();
server.listen();
