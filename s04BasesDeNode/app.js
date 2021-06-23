const { crearArchivo } = require("./helpers/multiplicar");
// 34, 35
const argv = require("yargs")
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    demandOption: true,
    default: false,
  })
  .option("li", {
    alistas: "limite",
    type: "number",
    demandOption: true,
    default: 10,
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      console.log("la base tiene que ser un número");
    }
    return true;
  }).argv;

//   36
const colors = require("colors");

console.log("*******229 inicio del proyecto**********");

// fs.writeFile("archivo.txt", salida, (err) => {
//   if (err) throw err;
//   console.log("archivo creado exitosamente");
// });

console.log("*******32 Recibir info de la línea de comando**********");
console.log("devuelve el path", process.argv);

// let [, , arg3 = "base=5"] = process.argv;
// let [, base = 5, listar = false] = arg3.split("=");

console.log(argv.b);
crearArchivo(argv.b, argv.l, argv.li)
  .then((fileName) => console.log(fileName, "creado"))
  .catch((error) => {
    console.log(error);
  });

console.log("*******34 Yargs**********");
console.log(process.argv);
console.log(argv);
