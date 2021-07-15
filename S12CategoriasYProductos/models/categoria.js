const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

// 125 rewrite method to not use __v and password, 143
CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...categoria } = this.toObject();

  return categoria;
};

module.exports = model("Categoria", CategoriaSchema);
