// 86
// const http = require("http");
// 88
const express = require("express");
const app = express();
const PORT = 8080;

// 89
app.use(express.static("public"));

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
