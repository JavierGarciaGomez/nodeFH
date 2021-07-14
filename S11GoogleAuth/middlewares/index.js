const validaCampos = require("../middlewares/validarCampos");
const validaJWT = require("../middlewares/validarJwt");
const validaRoles = require("../middlewares/validarRoles");

module.exports = {
  ...validaCampos,
  ...validaJWT,
  ...validaRoles,
};
