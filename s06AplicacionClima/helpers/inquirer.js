// 49, 50, 52
const inquirer = require("inquirer");
require("colors");

// 49, 50
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      { value: 1, name: "1.".green + " Buscar ciudad" },
      { value: 2, name: "2.".green + " Historial de ciudades buscadas" },
      { value: 0, name: "0.".red + " Salir" },
    ],
  },
];

// 49
const inquirerMenu = async () => {
  console.clear();
  console.log("========================".green);
  console.log("Selecciona una opción".green);
  console.log("========================".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

// 50
const pausar = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"enter".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor, ingresa un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

// 59
const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
    };
  });

  // agregar opción cancelar
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione el lugar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

// 60

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

// 59
const mostrarListadoChecklist = async (tareas) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccionar",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausar,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoChecklist,
};
