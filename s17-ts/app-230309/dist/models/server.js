"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = process.env.PORT || "3033";
        this.usersPath = "/api/users";
        this.authPath = "/api/auth";
        this.rolesPath = "/api/roles";
    }
    listen() {
        this.app.listen(this.PORT, () => console.log("Running on PORT ", this.PORT));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map