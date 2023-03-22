// 181
const { Router } = require("express");
const { check } = require("express-validator");
const {
  cargarArchivo,
  actualizarArchivo,
  mostrarImagen,
  actualizarArchivoClodunary,
} = require("../controllers");
const { validarCampos, validarArchivoSubir } = require("../middlewares");
const { coleccionesPermitidas } = require("../helpers");

const router = Router();

router.post("/", [validarArchivoSubir], cargarArchivo);
router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((coleccion) =>
      coleccionesPermitidas(coleccion, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  // actualizarArchivo
  actualizarArchivoClodunary
);

router.get("/:coleccion/:id", [
  check("id", "El id debe ser de mongo").isMongoId(),
  check("coleccion").custom((coleccion) =>
    coleccionesPermitidas(coleccion, ["usuarios", "productos"])
  ),
  validarCampos,
  mostrarImagen,
]);

module.exports = router;
