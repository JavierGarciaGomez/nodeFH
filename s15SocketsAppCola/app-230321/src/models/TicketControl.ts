import { ITicket } from "../interfaces/interfaces";
import * as fs from "fs";
import path from "path";
import data from "../db/data.json";
import { Ticket } from "./Ticket";

export class TicketControl {
  private last: number;
  private today: number;
  private tickets: Ticket[];
  private last4: Ticket[];

  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4 = [];
    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      last4: this.last4,
    };
  }

  get getlast() {
    return this.last;
  }

  get getLast4() {
    return this.last4;
  }

  get getTickets() {
    return this.tickets;
  }

  public init(): void {
    const { last, last4, tickets, today } = data;
    if (today === this.today) {
      console.log("LOADED FROM DB");
      this.tickets = tickets;
      this.last = last;
      this.last4 = last4;
      this.today = today;
    } else {
      this.saveDB();
    }
  }

  saveDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    console.log("SAVED INTO DB");
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveDB();
    return `Ticket ${ticket.number}`;
  }

  attendTicket(desk: string) {
    // No tenemos tickets
    if (this.tickets.length < 1) {
      return null;
    }

    const ticket = this.tickets.shift();

    if (!ticket) {
      return null;
    }

    ticket.desk = desk;

    this.last4.unshift(ticket);

    if (this.last4.length > 4) {
      this.last4.splice(-1, 1);
    }

    this.saveDB();

    return ticket;
  }
}
