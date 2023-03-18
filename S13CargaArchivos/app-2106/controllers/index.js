const auth = require("./auth");
const buscar = require("./buscar");
const categoria = require("./categorias");
const productos = require("./productos");
const uploads = require("./uploads");
const usuarios = require("./usuarios");

module.exports = {
  ...auth,
  ...buscar,
  ...categoria,
  ...productos,
  ...uploads,
  ...usuarios,
};
