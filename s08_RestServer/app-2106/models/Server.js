// 101, 102, 106
const express = require("express");
// 105
const cors = require("cors");
class Server {
  constructor() {
    this.PORT = process.env.PORT;
    this.app = express();
    // Middleware
    this.middlewares();
    // Rutas de mi app
    this.usuariosPath = "/api/users";
    this.routes();
    // 106
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/users"));
  }

  listen() {
    // 100
    this.app.listen(this.PORT, () => {
      console.log("listening");
    });
  }

  //   101 middlewares
  middlewares() {
    // 105
    this.app.use(cors());
    // 107 parseo y lectura del body
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
}

module.exports = Server;
