const TicketControl = require("../models/TicketControl");

// ..., 214, 216, 217, 218
const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.on("siguiente-ticket", (payload, callback) => {
    // me genera un nuevo, lo almacena y me regresa un string
    const siguiente = ticketControl.siguienteTicket();
    callback(siguiente);
    // TODO: notificar que hay un nuevo ticket pendiente de asignar
  });

  // 217
  socket.emit("ultimo-ticket", ticketControl.ultimo);

  // 218
  socket.on("atender-ticket", (payload, callback) => {
    console.log("controller", payload);
    const escritorio = payload.escritorio;
    if (!escritorio) {
      return callback({
        ok: false,
        msg: "El escritorio es obligatorio",
      });
    }

    const ticket = ticketControl.atenderTicket(escritorio);
    if (!ticket) {
      callback({
        ok: false,
        msg: "Ya no hay tickets pendientes",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }

    console.log("ticket", ticket);
  });

  // socket.on("enviar-mensaje", (payload, callback) => {
  //   const id = 123456789;
  //   callback(id);

  //   socket.broadcast.emit("enviar-mensaje", payload);
  // });
};

module.exports = {
  socketController,
};
