import prompts from "prompts";
import chalk from "chalk";
import { questionsMenu } from "./others";
import { Tasks } from "../models/Tasks";

export const printMenu = async () => {
  printSelectOptionHeader();
  const result = await prompts(questionsMenu);

  return result.value;
};

export const pause = async (): Promise<void> => {
  await prompts([
    {
      type: "text",
      name: "value",
      message: `${chalk.green("Press any key to continue")}`,
    },
  ]);
};

const printSelectOptionHeader = () => {
  console.log(
    chalk.magenta(`==================
Select an option
==================\n`)
  );
};

export const readSimpleInput = async (message: string) => {
  const result = await prompts([
    {
      type: "text",
      name: "value",
      message: `${chalk.green(message)}`,
      validate: (value) => {
        return value.length < 3 ? "Please use a longer input" : true;
      },
    },
  ]);

  return result.value;
};

export const selectTaskToDelete = async (tasks: Tasks) => {
  const choices = tasks.listArr.map((task) => ({
    title: task.description,
    value: task.id,
  }));
  choices.push({ title: "CANCEL", value: "CANCEL" });
  const result = await prompts([
    {
      type: "select",
      name: "value",
      message: `${chalk.green("What task do you want to delete?")}`,
      choices: choices,
    },
  ]);

  return result.value;
};

export const confirmSelection = async () => {
  const result = await prompts([
    { type: "confirm", name: "value", message: "confirm your selection" },
  ]);

  return result.value;
};

export const changeTasksStatus = async (tasks: Tasks) => {
  const choices = tasks.listArr.map((task, index) => ({
    title: `${chalk.magenta(index + 1)}. ${task.description} :: ${
      task.completed ? chalk.green("Completed") : chalk.red("Pending")
    }`,
    value: task.id,
  }));
  choices.push({ title: "CANCEL", value: "CANCEL" });
  const result = await prompts([
    {
      type: "multiselect",
      name: "value",
      message: `${chalk.green("What task do you want to change status?")}`,
      choices: choices,
      hint: "- Space to select. Return to submit",
    },
  ]);

  return result.value;
};
