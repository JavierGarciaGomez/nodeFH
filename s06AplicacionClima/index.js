// 67, 68
// 68
const {
  inquirerMenu,
  pausar,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
// 69
const Busquedas = require("./models/Busquedas");

// 67, 68
const main = async () => {
  // 69
  const busquedas = new Busquedas();

  //   68
  let opt;
  do {
    // print menu
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // mostrar mensaje
        const lugar = await leerInput("Escribe la ciudad");
        busquedas.ciudad(lugar);
        console.log(lugar);
        // buscar los lugares
        // seleccionar el lugar
        // clima
        // mostrar resultados
        break;

      case 2:
        console.log("opción 2 escogida");
        break;
    }

    if (opt !== 0) await pausar();
  } while (opt !== 0);
};

main();
