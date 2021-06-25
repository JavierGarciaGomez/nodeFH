const { read } = require("fs");

// 46, 47
require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("========================".green);
    console.log("Selecciona una opción".green);
    console.log("========================".green);

    console.log(`${"1.".blue} Crear tarea`);
    console.log(`${"2.".blue} Listar tareas`);
    console.log(`${"3.".blue} Listar tareas completadas`);
    console.log(`${"4.".blue} Listar tareas pendientes`);
    console.log(`${"5.".blue} Completar tareas`);
    console.log(`${"6.".blue} Borrar tarea`);
    console.log(`${"0.".blue} Salir`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opción: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausar = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Presione ${"Enter".green} para continuar`, (opt) => {
      console.log({ opt });
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausar,
};
