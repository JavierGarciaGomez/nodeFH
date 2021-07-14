// 140

const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;
  console.log("Imprimo id token", id_token);

  try {
    const googleUser = await googleVerify(id_token);
    console.log("Google User", googleUser);
    const { correo, nombre, img } = googleUser;
    let usuario = await Usuario.findOne({ correo });

    // si el usuario no existe, lo guarda en la base de datos
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: "",
        img,
        google: true,
      };
      // crea el usuario y lo graba
      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario en DB tiene estado falso
    if (!usuario.estado) {
      return res.status(401).json({ msg: "El usuario está bloqueado" });
    }

    // Generar el json web token
    const token = await generarJWT(usuario.id);

    // console.log("googleUser", googleUser);
    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token no es válido",
    });
  }
};
module.exports = {
  login,
  googleSignin,
};
