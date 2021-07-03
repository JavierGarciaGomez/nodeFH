// 106, 122
const { Router } = require("express");
const {
  usersGet,
  usersPut,
  usuariosPost,
  usersDelete,
  usersPatch,
} = require("../controllers/usuarios");
// 122
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { esRoleValido } = require("../helpers/db-validators");
const router = Router();

// 100, 101
router.get("/", usersGet);
// 101, 106, 108
router.put("/:id", usersPut);
// 101, 122, 124
router.post(
  "/",
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check(
    "password",
    "El password es obligatorio y contener más de seis letras"
  ).isLength({ min: 6 }),
  check("correo", "El correo no es válido").isEmail(),
  check("rol", "No es un rol válido").custom((rol) => esRoleValido(rol)),
  validarCampos,
  usuariosPost
);

// 101
router.delete("/", usersDelete);
// 101
router.patch("/", usersPatch);

module.exports = router;
