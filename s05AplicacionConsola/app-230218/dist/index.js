"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./helpers/messages");
const others_1 = require("./helpers/others");
const validations_1 = require("./helpers/validations");
const inquirer_1 = __importDefault(require("inquirer"));
inquirer_1.default
    .prompt(["a", "b"])
    .then((answers) => {
    console.log({ answers });
})
    .catch((error) => {
    if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
    }
    else {
        // Something else went wrong
    }
});
const main = async () => {
    let receivedOption = null;
    let isValidOption = false;
    do {
        receivedOption = await (0, messages_1.showMenu)();
        isValidOption = (0, validations_1.isOptionValid)(receivedOption, others_1.menuOptions);
        console.log({ receivedOption }, "0");
    } while (receivedOption !== "0");
    console.log("heer");
    //pause();
};
main();
//# sourceMappingURL=index.js.map