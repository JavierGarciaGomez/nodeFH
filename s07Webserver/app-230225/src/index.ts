import express from "express";
import path from "path";
import hbs from "hbs";
import { config } from "dotenv";
config();

const app = express();
const PORT = process.env.PORT;

// Define your routes and middleware here

// server static content
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
// Set the views directory to the 'views' folder inside 'src'
app.set("views", path.join(__dirname, "views"));

// Set the view engine to 'hbs'
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));

hbs.registerHelper("capitalizar", (texto) => {
  let palabras = texto.split(" ");
  palabras.forEach((palabra: string, idx: number) => {
    palabras[idx] =
      palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
  });

  return palabras.join(" ");
});
// handlebars
app.get("/", (req, res) =>
  res.render("home", { title: "Title as a variable", name: "Javi" })
);

app.get("/index", (req, res) => res.render("home"));
app.get("/generic", (req, res) => res.sendFile(`${publicPath}/generic.html`));
app.get("/elements", (req, res) => res.sendFile(`${publicPath}/elements.html`));

app.get("*", (req, res) => {
  res.sendFile(`${publicPath}/404.html`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
