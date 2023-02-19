"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inq = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
exports.inq = inquirer_1.default
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
//# sourceMappingURL=inquirer.js.map