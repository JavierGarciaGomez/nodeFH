// 101, 102, 106, 118, 165
const express = require("express");
// 105
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // Rutas de mi app
    // ..., 165
    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      usuarios: "/api/usuarios",
      categorias: "/api/categorias",
      productos: "/api/productos",
    };
    // this.usuariosPath = "/api/usuarios";
    // this.authPath = "/api/auth";
    // this.categoriasPath = "/api/categorias";

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
    // this.app.use(this.authPath, require("../routes/auth"));
    // this.app.use(this.usuariosPath, require("../routes/usuarios"));
    // this.app.use(this.categoriasPath, require("../routes/categorias"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
  }

  listen() {
    // 100
    this.app.listen(this.port, () => {
      console.log("listening");
    });
  }
}

module.exports = Server;
