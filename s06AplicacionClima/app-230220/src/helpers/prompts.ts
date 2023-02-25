import { ApiFeature } from "../interfaces/apiInterfaces";
import prompts from "prompts";
import chalk from "chalk";

const menuOptions = ["Search a city", "History", "Exit"];

export const printMenu = async () => {
  console.clear();
  console.log("before prompts");
  const choices = menuOptions.map((menuOption, index) => ({
    title: `${chalk.magentaBright(index)} ${menuOption}`,
    value: menuOption,
  }));

  const result = await prompts([
    {
      type: "select",
      name: "value",
      message: `${chalk.green("What task do you want to do?")}`,
      choices: choices,
    },
  ]);

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

export const selectACity = async (features: ApiFeature[]): Promise<string> => {
  console.log("before prompts");
  const result = await prompts([
    {
      type: "select",
      name: "value",
      message: `${chalk.green("Select a city")}`,
      choices: features.map((feature, index) => ({
        title: `${chalk.magentaBright(index)} ${feature.place_name}`,
        value: feature.id,
      })),
    },
  ]);
  console.log("after prompts");

  return result.value;
};
