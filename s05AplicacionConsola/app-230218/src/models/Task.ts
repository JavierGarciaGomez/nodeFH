import { v4 as uuidv4 } from "uuid";

export class Task {
  id: string;
  description: string;
  completed: boolean;
  completionDate?: Date;
  createdOn?: Date;

  constructor(description: string, completed: boolean = false) {
    this.id = uuidv4();
    this.description = description;
    this.completed = completed;
    this.createdOn = new Date();
  }
  public markAsCompleted() {
    this.completed = true;
  }
}
