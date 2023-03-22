import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/interfaces";

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: [true, "The name is needed"], unique: true },
  active: {
    type: Boolean,
    default: true,
    required: true,
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

categorySchema.methods.toJSON = function () {
  const { __v, ...resource } = this.toObject();

  return resource;
};

const CategoryModel = model<ICategory>("Category", categorySchema);

export default CategoryModel;
