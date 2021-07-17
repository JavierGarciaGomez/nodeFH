// 172
const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require("../helpers/dbValidators");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

// 172 Obtener productos
router.get("/", obtenerProductos);

// 172 obtenerProducto
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

// 172 crear producto
router.post(
  "/",
  [
    validarJWT,
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// 172 actualizar producto
router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "No es un id de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// 172
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
