// 144, 145
const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("token");
  console.log(token);

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el usuario a que corresponde el uid
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario inexistente",
      });
    }

    // Verificar si el uid tiene estado activo
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado false",
      });
    }
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "el token no es válido",
    });
  }
};

module.exports = {
  validarJWT,
};
