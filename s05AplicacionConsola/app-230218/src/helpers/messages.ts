import chalk from "chalk";
import { createInterface, ReadLine } from "readline";
import { menuOptions } from "./others";

export const showMenu = (): Promise<string> => {
  return new Promise<string>((resolve) => {
    printOptions();
    askQuestion("Select an option: ", resolve);
  });
};

export const pause = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    askQuestion(`Press ${chalk.green("ENTER")} to continue`, () => resolve());
  });
};

const printSelectOptionHeader = () => {
  console.log(chalk.magenta("=================="));
  console.log(chalk.magenta("Select an option"));
  console.log(chalk.magenta("==================\n"));
};

const printOptions = () => {
  console.clear();
  printSelectOptionHeader();

  Object.entries(menuOptions).forEach(([key, value]) => {
    console.log(`${chalk.magenta(key)}. ${value}`);
  });
};

const askQuestion = (question: string, callback: (answer: string) => void) => {
  const readLine: ReadLine = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readLine.question(question, (answer: string) => {
    readLine.close();
    callback(answer);
  });
};
