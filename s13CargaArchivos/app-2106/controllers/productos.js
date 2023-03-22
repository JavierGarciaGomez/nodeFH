// 172

const { response } = require("express");
const bcryptjs = require("bcryptjs");

const { generarJWT, googleVerify } = require("../helpers");

const { Producto, Categoria } = require("../models");

// 169
const obtenerProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      // pupulate
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    productos,
  });
};
// 172
const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await (await Producto.findById(id))
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json(producto);
};

// 172
const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre });

  // revisar si ya existe
  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }

  // Generar el objeto para guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  // guardar
  const producto = new Producto(data);

  await producto.save();

  res.status(201).json({
    producto,
  });
};

// 172
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.usuario._id;
  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
  res.json(producto);
};

// 172
const borrarProducto = async (req, res = response) => {
  const { id } = req.params;
  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json(productoBorrado);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};
