const { response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se requiere verificar el role sin validar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "El usuario debe ser administrador",
    });
  }
  next();
};

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    console.log(roles);
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se requiere verificar el role sin validar el token primero",
      });
    }
    const { rol, nombre } = req.usuario;
    if (!roles.includes(rol)) {
      return res.status(401).json({
        msg: "El usuario debe ser administrador",
      });
    }
    console.log("si tiene un rol válido");
    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
