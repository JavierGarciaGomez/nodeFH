// 106

const { response } = require("express");
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

const usersPost = (req, res = response) => {
  const { nombre, edad } = req.body;
  console.log(nombre);

  res.json({
    msg: "post API - usersPost",
    nombre,
    edad,
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
  usersPost,
  usersPatch,
};
