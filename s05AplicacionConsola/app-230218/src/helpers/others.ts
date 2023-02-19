import chalk from "chalk";
import { PromptObject } from "prompts";

export const menuOptions: Record<number, string> = {
  1: "Create task",
  2: "List tasks",
  3: "List completed tasks",
  4: "List pending tasks",
  5: "Complete tasks",
  6: "Delete task",
  0: "Exit",
};

export const questionsMenu: PromptObject[] = [
  {
    type: "select",
    name: "value",
    message: `${chalk.green("What do you want to do?")}`,
    choices: Object.entries(menuOptions).map(([title, value]) => ({
      title: `${chalk.magenta(`${title}.`)} ${value}`,
      value: title,
    })),
  },
];

export const questionsContinue: PromptObject[] = [
  {
    type: "text",
    name: "value",
    message: `${chalk.green("Press any key to continue: ")}`,
  },
];

export const questionsCreateTask: PromptObject[] = [
  {
    type: "text",
    name: "value",
    message: `${chalk.green("Add the description of the new task: ")}`,
  },
];
