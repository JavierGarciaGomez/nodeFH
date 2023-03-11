import cors from "cors";
import express, { Application } from "express";
import path from "path";
import db from "../db/connection";
import usersRouter from "../routes/users";

class Server {
  private app: Application;
  private PORT: string;
  private apiPaths = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3033";
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.apiPaths.users, usersRouter);
  }

  listen() {
    this.app.listen(this.PORT, () => console.log("Running on PORT", this.PORT));
  }

  middlewares() {
    this.app.use(cors());
    const publicPath = path.join(__dirname, "../public");
    this.app.use(express.static(publicPath));
    // body read and parse
    this.app.use(express.json());
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("DATABASE ONLINE");
    } catch (error) {
      throw error;
    }
  }
}

export default Server;
