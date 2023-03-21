import express, { Express } from "express";
import cors from "cors";
import path from "path";
import http from "http";
import { Server as SocketServer, Socket } from "socket.io";
import { handleSocketEvents } from "../sockets/controller";

class Server {
  private app: Express;
  private PORT: string;
  private apiPaths = {};
  private server: http.Server;
  private io: SocketServer;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3033";
    this.server = http.createServer(this.app);

    this.middlewares();
    this.routes();
    this.io = new SocketServer(this.server);
    // Sockets
    this.sockets();
  }

  routes() {}

  middlewares() {
    this.app.use(cors());
    const publicPath = path.join(__dirname, "../public");
    this.app.use(express.static(publicPath));
    // body read and parse
  }

  sockets() {
    this.io.on("connection", handleSocketEvents);
  }

  listen() {
    this.server.listen(this.PORT, () =>
      console.log("Running on PORT ", this.PORT)
    );
  }
}

export default Server;
