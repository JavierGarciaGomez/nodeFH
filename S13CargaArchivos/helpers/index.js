const dbValidators = require("./dbValidators");
const generarJwt = require("./generarJwt");
const googleVerify = require("./googleVerify");
const subirArchivo = require("./subirArchivo");

module.exports = {
  ...dbValidators,
  ...generarJwt,
  ...googleVerify,
  ...subirArchivo,
};
