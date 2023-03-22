// 167, 168, 169

const { response } = require("express");
const bcryptjs = require("bcryptjs");

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const { Categoria } = require("../models");

// 169 obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      // pupulate
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    categorias,
  });
};
// 169 obtenerCategoria - populate {}
const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await (
    await Categoria.findById(id)
  ).populate("usuario", "nombre");

  console.log(id);

  res.json(categoria);
};

// actualizarCategoria
// borrarCategoria

// 167
const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });
  // revisar si ya existe
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }
  // Generar el objeto para guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  console.log("categoriasControllers: imprimoData", data);

  // guardar
  const categoria = new Categoria(data);
  console.log("categoria", categoria);
  await categoria.save();

  res.status(201).json({
    categoria,
  });
};

// 170
const actualizarCategoria = async (req, res = response) => {
  // obtengo el id
  const { id } = req.params;

  // extraigo lo que no me sirve
  const { estado, usuario, ...data } = req.body;

  // le pongo el nombre el mayúscula
  data.nombre = data.nombre.toUpperCase();

  // le pongo los datos del nuevo usuario
  data.usuario = req.usuario._id;
  console.log("imprimo la data", data);

  // actualizo la categoría
  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

// 170
const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(categoriaBorrada);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
