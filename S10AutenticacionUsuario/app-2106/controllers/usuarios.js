// 106, 127

const { response, request } = require("express");
const Usuario = require("../models/usuario");
// 121
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// 129
const usersGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

// ..., 120, 121, 122
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol });
  // 122 Verificar si el correo existe
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    return res.status(400).json({ msg: "El correo ya está registrado" });
  }
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  // Encriptar la contraseña
  // Guardar en db

  await usuario.save();
  res.json({
    usuario,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  // 127 extraer lo que no me sirve
  const { _id, password, google, ...rest } = req.body;

  // TODO validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, rest);

  console.log(id);

  res.json(usuario);
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usersPatch",
  });
};

// ... 144, 145
const usersDelete = async (req, res = response) => {
  const { id } = req.params;
  // const uid = req.uid;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  const usuarioAutenticado = req.usuario;
  // console.log(req.usuario);

  res.json({ usuario, usuarioAutenticado });
};

module.exports = {
  usersGet,
  usersPut,
  usersDelete,
  usuariosPost,
  usersPatch,
};
