import { Task } from "./Task";
import chalk from "chalk";

export class Tasks {
  private _list: Record<string, Task> = {};

  constructor() {
    this._list = {};
  }

  public get listArr() {
    return Object.values(this._list);
  }

  public addTask = (description: string) => {
    const task = new Task(description);
    this._list[task.id] = task;
  };

  public printAllTasks = () => {
    console.log(this._list);
  };

  public loadTasks = (tasks: Task[]) => {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  };

  public listAllTasks = () => {
    this.printTasks(this.listArr);
  };

  public printTasksByCompletionStatus = (completionStatus: boolean) => {
    const filteredTasks = this.listArr.filter(
      (task) => task.completed === completionStatus
    );
    this.printTasks(filteredTasks);
  };

  private printTasks = (tasks: Task[]) => {
    tasks.forEach(({ description, completed }, index) => {
      const status = completed ? chalk.green("Complete") : chalk.red("Pending");

      console.log(`${chalk.magenta(index + 1)}. ${description} :: ${status}`);
    });
  };

  public removeTask = (id: string) => {
    delete this._list[id];
  };

  public toggleTaskStatus = (taskIds: string[]) => {
    taskIds.forEach((taskId) => {
      this._list[taskId].completed = !this._list[taskId].completed;
      this._list[taskId].completionDate = this._list[taskId].completed
        ? new Date()
        : null;
    });
  };
}
