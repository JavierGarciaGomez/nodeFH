// 86
// const http = require("http");
// 88
const express = require("express");
const app = express();

// 94
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// 91
const hbs = require("hbs");
// 93
// require("./hbs/helpers");
app.set("view engine", "hbs");

// 89
app.use(express.static("public"));

// 93 Express HBS engine
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

// 91
app.get("/", (req, res) => {
  res.render("home", {
    nombre: "Javier",
    titulo: "Curso de Node",
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/generic", (req, res) => {
  res.sendFile(__dirname + "/public/generic.html");
});

app.get("/elements", (req, res) => {
  res.sendFile(__dirname + "/public/elements.html");
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(PORT, () => {
  console.log(`listening at port: ${PORT}`);
});

// http
//   .createServer((req, res) => {
//     res.write("Hola, mundo");
//     console.log(req);
//     res.end();
//   })
//   .listen(8080);

// console.log("escuchando en el puerto", 8080);
