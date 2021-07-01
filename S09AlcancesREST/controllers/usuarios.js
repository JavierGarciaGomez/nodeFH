// 106

const { response, request } = require("express");
const Usuario = require("../models/usuario");

const usersGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol });
  await usuario.save();
  res.json({
    usuario,
  });
};

const usersPut = (req, res = response) => {
  const { id } = req.params;
  console.log(id);

  res.json({
    msg: "put API - usersPut",
    id,
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usersPatch",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "delete API - usersDelete",
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersDelete,
  usuariosPost,
  usersPatch,
};
