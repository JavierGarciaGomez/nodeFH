const fs = require("fs");
const colors = require("colors");

const crearArchivo = async (base = 5, listar = false, limite = 10) => {
  try {
    if (listar) {
      console.log("===================".cyan);
      console.log(`   Tabla del ${base}`.red);
      console.log("===================".cyan);
    }
    let salida = "";
    let consola = "";
    for (let i = 1; i <= limite; i++) {
      salida += `${base} X ${i} = ${base * i}\n`;
      consola += `${colors.yellow(base)} X ${colors.yellow(i)} = ${colors.green(
        base * i
      )}\n`;
    }

    if (listar) {
      console.log(consola);
    }

    // fs.writeFile("archivo.txt", salida, (err) => {
    //   if (err) throw err;
    //   console.log("archivo creado exitosamente");
    // });

    const fileName = `tabla del ${base}.txt`;
    await fs.writeFileSync(`./salida/${fileName}`, salida);
    return fileName;
  } catch (error) {
    throw error;
  }
};

module.exports = { crearArchivo };
