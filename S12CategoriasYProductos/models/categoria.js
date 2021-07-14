const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  estado: {
    type: Boolean,
    required: [true, "El estado es obligatorio"],
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },

  google: {
    type: Boolean,
    default: false,
  },
});

// 125 rewrite method to not use __v and password, 143
CategoriaSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("Usuario", CategoriaSchema);
