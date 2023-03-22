import { Socket } from "socket.io";
import { TicketControl } from "../models/TicketControl";

export const handleSocketEvents = (socket: Socket) => {
  const ticketControl = new TicketControl();
  socket.emit("last-ticket", ticketControl.getlast);
  socket.emit("current-state", ticketControl.getLast4);
  socket.emit("pending-tickets", ticketControl.getTickets.length);

  console.log("Cliente conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });

  // socket.on("enviar-mensaje", (payload, callback) => {
  //   const infoToSend = { id: 123456789, date: new Date() };
  //   callback(infoToSend);
  //   socket.broadcast.emit("enviar-mensaje", payload);
  // });

  socket.emit("last-ticket", ticketControl.getlast);
  socket.on("next-ticket", (payload, callback) => {
    const nextTicket = ticketControl.next();
    callback(nextTicket);
    socket.broadcast.emit("next-ticket", payload);
  });
  socket.on("attend-ticket", ({ desk }, callback) => {
    if (!desk) {
      return callback({
        ok: false,
        msg: "The desk is required",
      });
    }

    const ticket = ticketControl.attendTicket(desk);
    console.log({ ticket });

    socket.broadcast.emit("current-state", ticketControl.getLast4);
    socket.emit("pending-tickets", ticketControl.getTickets.length);
    socket.broadcast.emit("pending-tickets", ticketControl.getTickets.length);

    if (!ticket) {
      callback({
        ok: false,
        msg: "No more pending tickets",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};
