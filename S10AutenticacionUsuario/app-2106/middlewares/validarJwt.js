// 144, 145
const Usuario = require("../models/usuario");

const jwt = require("jsonwebtoken");
const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(500).json({
      msg: "no hay token en la petición",
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
