const validaCampos = require("../middlewares/validarCampos");
const validaJWT = require("../middlewares/validarJwt");
const validaRoles = require("../middlewares/validarRoles");
const validarArchivo = require("./validarArchivo");

module.exports = {
  ...validaCampos,
  ...validaJWT,
  ...validaRoles,
  ...validarArchivo,
};
