"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const hbs_1 = __importDefault(require("hbs"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Define your routes and middleware here
// server static content
const publicPath = path_1.default.join(__dirname, "public");
app.use(express_1.default.static(publicPath));
// Set the views directory to the 'views' folder inside 'src'
app.set("views", path_1.default.join(__dirname, "views"));
// Set the view engine to 'hbs'
app.set("view engine", "hbs");
hbs_1.default.registerPartials(path_1.default.join(__dirname, "/views/partials"));
hbs_1.default.registerHelper("capitalizar", (texto) => {
    let palabras = texto.split(" ");
    palabras.forEach((palabra, idx) => {
        palabras[idx] =
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });
    return palabras.join(" ");
});
// handlebars
app.get("/", (req, res) => res.render("home", { title: "Title as a variable", name: "Javi" }));
app.get("/index", (req, res) => res.render("home"));
app.get("/generic", (req, res) => res.sendFile(`${publicPath}/generic.html`));
app.get("/elements", (req, res) => res.sendFile(`${publicPath}/elements.html`));
app.get("*", (req, res) => {
    res.sendFile(`${publicPath}/404.html`);
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map