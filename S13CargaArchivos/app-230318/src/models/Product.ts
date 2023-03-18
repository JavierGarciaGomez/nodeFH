import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/interfaces";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: [true, "The name is needed"], unique: true },
  price: { type: Number, default: 0 },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.methods.toJSON = function () {
  const { __v, ...resource } = this.toObject();

  return resource;
};

const ProductModel = model<IProduct>("Product", productSchema);

export default ProductModel;
