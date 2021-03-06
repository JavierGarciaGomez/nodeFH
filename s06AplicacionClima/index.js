// 67, 68
// 68
const {
  inquirerMenu,
  pausar,
  leerInput,
  listarLugares: listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
  listarLugares,
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
        // buscar los lugares
        const lugares = await busquedas.ciudad(lugar);
        // seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === "0") {
          continue;
        }
        const lugarSel = lugares.find((lugar) => lugar.id === id);
        // llamar al historial
        busquedas.agregarHistorial(lugarSel.nombre);

        // clima

        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
        // Mostrar resultados

        console.clear();
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", lugarSel.nombre.green);
        console.log("Lat:", lugarSel.lat);
        console.log("Lng:", lugarSel.lng);
        console.log("Temperatura:", clima.temp);
        console.log("Mínima:", clima.min);
        console.log("Máxima:", clima.max);
        console.log("Como está el clima:", clima.desc);

        break;

      case 2:
        busquedas.historial.forEach((lugar, index) => {
          console.log(index + 1, lugar);
        });
        break;
    }

    if (opt !== 0) await pausar();
  } while (opt !== 0);
};

main();
