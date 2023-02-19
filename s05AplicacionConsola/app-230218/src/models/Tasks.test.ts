import { Tasks } from "./Tasks";
import { Task } from "./Task";

describe("Tasks", () => {
  let tasks: Tasks;

  beforeEach(() => {
    tasks = new Tasks();
  });

  it("should add task to the list", () => {
    tasks.addTask("Task 1");
    tasks.addTask("Task 2");

    expect(tasks.listArr.length).toBe(2);
    expect(tasks.listArr[0].description).toBe("Task 1");
    expect(tasks.listArr[1].description).toBe("Task 2");
  });

  it("should print all tasks", () => {
    const consoleSpy = jest.spyOn(console, "log");
    tasks.addTask("Task 1");
    tasks.addTask("Task 2");
    tasks.printAllTasks();
  });

  it("should load tasks from an array", () => {
    const tasksArray = [new Task("Task 1", true), new Task("Task 2", false)];
    tasks.loadTasks(tasksArray);
    expect(tasks.listArr.length).toBe(2);
    expect(tasks.listArr[0].description).toBe("Task 1");
    expect(tasks.listArr[0].completed).toBe(true);
    expect(tasks.listArr[1].description).toBe("Task 2");
    expect(tasks.listArr[1].completed).toBe(false);
  });
});
