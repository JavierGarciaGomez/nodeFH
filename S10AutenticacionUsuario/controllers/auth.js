// 140

const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

// 140, 141
const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario o contraseña son incorrectas - mail",
      });
    }
    // si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario o contraseña son incorrectas - estado: false",
      });
    }

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña son incorrectas - estado: contraseña",
      });
    }

    console.log(validPassword);

    // generar el JWT
    const token = await generarJWT(usuario.id);

    return res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  login,
};
