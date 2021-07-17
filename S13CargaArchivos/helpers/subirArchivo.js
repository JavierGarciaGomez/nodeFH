// 185
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesPermitidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve = res, reject = rej) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    console.log(nombreCortado);
    const extension = nombreCortado[nombreCortado.length - 1];
    console.log(extension);
    if (!extensionesPermitidas.includes(extension)) {
      return reject(
        `Extensión no permitida. Las extensiones permitidas son: ${extensionesPermitidas}`
      );
    }
    //   generar un nombre temporal
    const tempName = uuidv4() + "." + extension;

    console.log(tempName);

    //   validar extensiones

    const uploadPath = path.join(__dirname, `../uploads/${carpeta}`, tempName);
    console.log(uploadPath);

    archivo.mv(uploadPath, (err) => {
      console.log("aca");
      if (err) {
        console.log("error");
        return reject(err);
      }

      resolve(tempName);
    });
  });
};

module.exports = { subirArchivo };
