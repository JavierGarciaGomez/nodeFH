"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pause = exports.showMenu = void 0;
const chalk_1 = __importDefault(require("chalk"));
const readline_1 = require("readline");
const others_1 = require("./others");
const showMenu = () => {
    return new Promise((resolve, reject) => {
        printOptions();
        askQuestion("Select an option: ", resolve);
    });
};
exports.showMenu = showMenu;
const pause = () => {
    return new Promise((resolve, reject) => {
        askQuestion(`Press ${chalk_1.default.green("ENTER")} to continue`, () => resolve());
    });
};
exports.pause = pause;
const printSelectOptionHeader = () => {
    console.log(chalk_1.default.magenta("=================="));
    console.log(chalk_1.default.magenta("Select an option"));
    console.log(chalk_1.default.magenta("==================\n"));
};
const printOptions = () => {
    console.clear();
    printSelectOptionHeader();
    Object.entries(others_1.menuOptions).forEach(([key, value]) => {
        console.log(`${chalk_1.default.magenta(key)}. ${value}`);
    });
};
const askQuestion = (question, callback) => {
    const readLine = (0, readline_1.createInterface)({
        input: process.stdin,
        output: process.stdout,
    });
    readLine.question(question, (answer) => {
        readLine.close();
        callback(answer);
    });
};
//# sourceMappingURL=messages.js.map