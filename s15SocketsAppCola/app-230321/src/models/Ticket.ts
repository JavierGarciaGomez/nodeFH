export class Ticket {
  number: number;
  desk: string | null;

  constructor(number: number, desk: string | null) {
    this.number = number;
    this.desk = desk;
  }
}
