// ..., 214, 215

const path = require("path");
const fs = require("fs");
const Ticket = require("../models/Ticket");

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    // 214 iniciar el servidor
    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
  }

  //  214 para iniciar el servidor
  init() {
    //   convertir ek json en un js object
    const { hoy, tickets, ultimo, ultimos4 } = require("../db/data.json");
    if (hoy === this.hoy) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimos4 = ultimos4;
    } else {
      // Es otro dia
      this.guardarDB();
    }
  }

  //   214
  guardarDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  siguienteTicket() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    console.log(this.tickets);
    this.tickets.push(ticket);
    this.guardarDB();
    return "Ticket" + ticket.numero;
  }

  atenderTicket(escritorio) {
    //   No tenemos tickets
    if (this.tickets.lenght === 0) {
      return null;
    }
    const ticket = this.tickets.shift();
    console.log("atender ticket", ticket);
    ticket.escritorio = escritorio;
    this.ultimos4.unshift(ticket);
    // validar que no haya más de 4
    if (this.ultimos4length > 4) {
      this.ultimos4.splice(-1, 1);
    }
    console.log(this.ultimos4);
    this.guardarDB();
    return ticket;
  }
}

module.exports = TicketControl;
