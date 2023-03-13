import { check } from "express-validator";
import { CategoryModel } from "../models";

import RoleModel from "../models/Role";
import UserModel from "../models/User";

export const checkUserRole = check("role")
  .optional()
  .custom(async (role) => {
    if (role) {
      const existingRole = await RoleModel.exists({ role });
      if (!existingRole) {
        throw new Error(`The role '${role}' is not registered in the database`);
      }
    }
  });

export const checkEmailUniqueness = check("email").custom(async (email) => {
  const emailExists = await UserModel.exists({ email });
  if (emailExists)
    throw new Error(`The email '${email}' is already registered`);
});

export const checkRoleUniqueness = check("role").custom(async (role) => {
  const roleExists = await RoleModel.exists({ role });
  if (roleExists) throw new Error(`The role '${role}' is already registered`);
});

export const checkCategoryNameUniqueness = check("name").custom(
  async (name) => {
    name = name.toUpperCase();
    const nameExists = await CategoryModel.exists({ name });
    if (nameExists) throw new Error(`The name '${name}' is already registered`);
  }
);

export const checkIfUserExists = check("id").custom(async (id) => {
  const userExists = await UserModel.findById(id);
  if (!userExists) throw new Error(`There is no user with the id '${id}'`);
});

export const checkIfCategoryExists = check("id").custom(async (id) => {
  const resourceExists = await CategoryModel.findById(id);
  if (!resourceExists)
    throw new Error(`There is no resource with the id '${id}'`);
});
