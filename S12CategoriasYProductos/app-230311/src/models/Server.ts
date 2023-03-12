import { authRouter } from "./../routes/auth";
import { connectDataBase } from "../db/config";
import express, { Express } from "express";
import cors from "cors";
import path from "path";
import { usersRouter } from "../routes/users";
import { rolesRouter } from "../routes/roles";

class Server {
  private app: Express;
  private PORT: string;
  private apiPaths = {
    usersPath: "/api/users",
    authPath: "/api/auth",
    rolesPath: "/api/roles",
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
    this.app.use(this.apiPaths.usersPath, usersRouter);
    this.app.use(this.apiPaths.rolesPath, rolesRouter);
    this.app.use(this.apiPaths.authPath, authRouter);
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
