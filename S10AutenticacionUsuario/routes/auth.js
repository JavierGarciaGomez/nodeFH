// 140
const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

router.post(
  "/login",
  check("correo", "El correo es obligatorio").isEmail(),
  check("password", "La contraseña es obligatorio").not().isEmpty(),
  validarCampos,
  login
);

module.exports = router;
