// 165
const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares");
const { validarJWT } = require("../middlewares");

const router = Router();

// Obtener todas las categorías
router.get("/", (req, res) => {
  res.json({ msg: "todo ok" });
});

// Obtener una categoría por id

// 167, Crear categoría - privado (cualquier toqen válido)
router.post("/", [validarJWT], (req, res) => {
  res.json("post");
});

// Actualizar categoría

// Borrar categoría (solo admin)

module.exports = router;
