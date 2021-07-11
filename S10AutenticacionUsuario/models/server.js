// 101, 102, 106, 118
const express = require("express");
// 105
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // Rutas de mi app
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

    // Conexión a la base de datos

    this.conectarDB();

    // Middleware
    this.middlewares();

    this.routes();
    // 106
  }

  // 118
  async conectarDB() {
    console.log("Conectando a la DB");
    console.log(process.env.MONGODB_CNN);
    await dbConnection();
  }
  middlewares() {
    // 105
    this.app.use(cors());
    // 107 parseo y lectura del body
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    // 140
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    // 100
    this.app.listen(this.port, () => {
      console.log("listening");
    });
  }
}

module.exports = Server;
