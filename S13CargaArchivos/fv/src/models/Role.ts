import mongoose, { Schema, model } from "mongoose";
import { IUser, IRole } from "../interfaces/interfaces";

const roleSchema = new Schema<IRole>({
  role: { type: String, required: [true, "The role is needed"], unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const RoleModel = model<IRole>("Role", roleSchema);

export default RoleModel;
