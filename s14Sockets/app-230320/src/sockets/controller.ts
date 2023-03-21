import { Socket } from "socket.io";

export const handleSocketEvents = (socket: Socket) => {
  console.log("Cliente conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });

  socket.on("enviar-mensaje", (payload, callback) => {
    console.log({ payload, callback });
    const infoToSend = { id: 123456789, date: new Date() };
    callback(infoToSend);
    socket.broadcast.emit("enviar-mensaje", payload);
  });
};
