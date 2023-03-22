// 125
const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya está registrado`);
  }
};

// 128
const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

// 169
const existeCategoriaPorId = async (id) => {
  console.log("verificando si la categoría existe");
  // Verificar si la categoría existe
  const existeCategoria = await Categoria.findById(id);
  console.log("existe categoría", existeCategoria);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

// 172
const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

// 187
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const estaIncluida = colecciones.includes(coleccion);
  if (!estaIncluida) {
    throw new Error(
      `La colección ${coleccion} no está permitida. Colecciones permitidas: ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas,
};
