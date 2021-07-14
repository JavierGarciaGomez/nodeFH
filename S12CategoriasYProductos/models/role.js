const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [false, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
