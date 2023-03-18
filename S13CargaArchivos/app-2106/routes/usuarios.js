// 106, 122, 128
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

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/dbValidators");

// 148
const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares/index");

const router = Router();

// 100, 101
router.get("/", usersGet);
// 101, 106, 108
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
  ],
  validarCampos,
  usersPut
);
// 101, 122, 124
router.post(
  "/",
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check(
    "password",
    "El password es obligatorio y contener más de seis letras"
  ).isLength({ min: 6 }),
  check("correo", "El correo no es válido").isEmail(),
  check("correo").custom(emailExiste),
  check("rol", "No es un rol válido").custom((rol) => esRoleValido(rol)),
  validarCampos,
  usuariosPost
);

// 101, 131
router.delete(
  "/:id",

  validarJWT,
  tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
  // esAdminRole,
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],

  usersDelete
);
// 101
router.patch("/", usersPatch);

module.exports = router;
