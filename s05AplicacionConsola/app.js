// 46, 47, 50, 51, 52, 54, 55, 56, 59
require("colors");

// 54
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
// const { mostrarMenu, pausar } = require("./helpers/mensajes");
// 49, 50
const {
  inquirerMenu,
  pausar,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tarea = require("./models/Tarea");
const Tareas = require("./models/Tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  //   55
  if (tareasDB) {
    //   listar tareas
    tareas.cargarTareasFromArray(tareasDB);
  }
  //   await pausar();

  do {
    //   imprimir menú
    opt = await inquirerMenu();
    // 52
    switch (opt) {
      case "1":
        //   crear opcion
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.listarPendientesCompletadas(true);
        break;

      case "4":
        tareas.listarPendientesCompletadas(false);
        break;

      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        console.log({ id });
        const confirmation = await confirmar(
          "¿Confirma que quiere borrar la tarea?"
        );
        if (confirmation) {
          tareas.borrarTarea(id);
        }

        break;
    }

    // 54
    guardarDB(tareas.listadoArr);
    await pausar();
    // 52
    // 51
    // const tarea = new Tarea("Comprar cmida");
    // console.log(tarea, tareas);
  } while (opt != "0");
};

main();
