import {
  printMenu,
  pause,
  readSimpleInput,
  selectTaskToDelete,
  confirmSelection,
  changeTasksStatus,
} from "./helpers/prompts";
import { readDB, saveDB } from "./helpers/saveFile";
import { Tasks } from "./models/Tasks";

const main = async () => {
  const tasks = new Tasks();
  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTasks(tasksDB);
  }

  let selectedOption;

  do {
    selectedOption = await printMenu();

    switch (selectedOption) {
      case "1":
        const result = await readSimpleInput(
          '"Add the description of the new task: "'
        );
        tasks.addTask(result);

        break;

      case "2":
        tasks.listAllTasks();
        break;

      case "3":
        tasks.printTasksByCompletionStatus(true);
        break;

      case "4":
        tasks.printTasksByCompletionStatus(false);
        break;

      case "5":
        const selectedTasks = await changeTasksStatus(tasks);
        tasks.toggleTaskStatus(selectedTasks);
        break;

      case "6":
        const selectedTask = await selectTaskToDelete(tasks);
        if (selectedTask === "CANCEL") break;
        const confirmation = await confirmSelection();
        if (confirmation) tasks.removeTask(selectedTask);
        break;

      default:
        console.log("Not a valid option.");
        break;
    }
    saveDB(tasks.listArr);
    if (selectedOption !== "0") await pause();
  } while (selectedOption !== "0");
};

main();
