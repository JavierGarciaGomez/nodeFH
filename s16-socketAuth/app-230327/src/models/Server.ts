import { routers } from ".././routes";
import { connectDataBase } from "../db/config";
import fileUpload from "express-fileupload";
import express, { Express } from "express";
import cors from "cors";
import path from "path";
import http, { Server as httpServer, createServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import { handleSocketEvents } from "../sockets/handleSocketEvents";

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
    uploadsPath: "/api/uploads",
  };
  private server: httpServer;
  private io: SocketServer;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3033";
    this.server = createServer(this.app);
    this.connectDB();
    this.middlewares();
    this.routes();
    this.io = new SocketServer(this.server);
    this.sockets();
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
    this.app.use(this.apiPaths.uploadsPath, routers.uploads);
  }

  middlewares() {
    this.app.use(cors());
    const publicPath = path.join(__dirname, "../public");
    this.app.use(express.static(publicPath));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
    // body read and parse
    this.app.use(express.json());
  }

  sockets() {
    this.io.on("connection", (socket) => handleSocketEvents(socket, this.io));
  }

  listen() {
    this.server.listen(this.PORT, () =>
      console.log("Running on PORT ", this.PORT)
    );
    // this.app.listen(this.PORT, () =>
    //   console.log("Running on PORT ", this.PORT)
    // );
  }
}

export default Server;