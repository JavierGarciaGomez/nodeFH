import { authRouter } from "./../routes/auth";
import { connectDataBase } from "../db/config";
import express, { Express } from "express";
import cors from "cors";
import path from "path";
import { usersRouter } from "../routes/users";
import { rolesRouter } from "../routes/roles";

export class Server {
  private app: Express;
  private PORT: string;
  private usersPath: string;
  private rolesPath: string;
  private authPath: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3033";
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";
    this.rolesPath = "/api/roles";

    // connect to database
    this.connectDB();

    // MIDDLEWARES
    this.middlewares();
    this.routes();
  }

  connectDB = async () => {
    await connectDataBase();
  };

  routes() {
    this.app.use(this.usersPath, usersRouter);
    this.app.use(this.rolesPath, rolesRouter);
    this.app.use(this.authPath, authRouter);
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
