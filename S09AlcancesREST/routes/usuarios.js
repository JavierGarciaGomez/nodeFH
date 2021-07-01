// 106
const { Router } = require("express");
const {
  usersGet,
  usersPut,
  usuariosPost,
  usersDelete,
  usersPatch,
} = require("../controllers/usuarios");
const router = Router();

// 100, 101
router.get("/", usersGet);
// 101, 106, 108
router.put("/:id", usersPut);
// 101
router.post("/", usuariosPost);

// 101
router.delete("/", usersDelete);
// 101
router.patch("/", usersPatch);

module.exports = router;
