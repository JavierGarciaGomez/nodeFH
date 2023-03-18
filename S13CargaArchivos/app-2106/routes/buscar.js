// 173
const { Router } = require("express");
const { buscar } = require("../controllers/buscar");

const router = Router();

// 172 Obtener productos
router.get("/:coleccion/:termino", buscar);

module.exports = router;
