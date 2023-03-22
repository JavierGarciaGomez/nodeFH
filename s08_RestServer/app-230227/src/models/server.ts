import express, { Express } from "express";
import cors from "cors";
import path from "path";
import { router } from "../routes/users";

export class Server {
  private app: Express;
  private PORT: string;
  private usersPath: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3033";
    this.usersPath = "/api/users";

    // MIDDLEWARES
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use("/api/users", router);
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
