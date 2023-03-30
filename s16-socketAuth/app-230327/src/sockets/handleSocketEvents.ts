import { IUser } from "./../../../../s13CargaArchivos/app-230318/src/interfaces/interfaces";
import { validateJwt2 } from "../middlewares";
import { Server as SocketServer, Socket } from "socket.io";
import Chat from "../models/Chat";

const chat = new Chat();

export const handleSocketEvents = async (socket: Socket, io: SocketServer) => {
  const token = socket.handshake.headers["authorization"];

  const user = (await validateJwt2(token as string)) as IUser;
  console.log(user + "is connected");

  chat.connectUser(user);
  io.emit("active-users", chat.usersArr);

  socket.on("disconnect", () => {
    chat.disconnectUser(user.id);

    io.emit("active-users", chat.usersArr);
  });

  socket.on("send-message", ({ uid, message }) => {
    console.log("msg received", { uid, message });
    if (uid) {
      // message privado
      socket.to(uid).emit("private-message", { from: user.name, message });
    } else {
      chat.sendMessage(user.id, user.name, message);
      console.log(chat.last10Msgs);
      io.emit("receive-messages", chat.last10Msgs);
    }
  });
};
