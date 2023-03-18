import { routers } from ".././routes";
import { connectDataBase } from "../db/config";
import express, { Express } from "express";
import cors from "cors";
import path from "path";

class Server {
  private app: Express;
  private PORT: string;
  private apiPaths = {
    usersPath: "/api/users",
    authPath: "/api/auth",
    rolesPath: "/api/roles",
    categoriesPath: "/api/categories",
    productsPath: "/api/products",
    searchPath: "/api/search",
  };

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3033";
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await connectDataBase();
  }

  routes() {
    this.app.use(this.apiPaths.usersPath, routers.users);
    this.app.use(this.apiPaths.rolesPath, routers.roles);
    this.app.use(this.apiPaths.authPath, routers.auth);
    this.app.use(this.apiPaths.categoriesPath, routers.categories);
    this.app.use(this.apiPaths.productsPath, routers.products);
    this.app.use(this.apiPaths.searchPath, routers.search);
  }

  middlewares() {
    this.app.use(cors());
    const publicPath = path.join(__dirname, "../public");
    this.app.use(express.static(publicPath));
    // body read and parse
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.PORT, () =>
      console.log("Running on PORT ", this.PORT)
    );
  }
}

export default Server;
