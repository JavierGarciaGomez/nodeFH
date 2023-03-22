import { check } from "express-validator";

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

export const checkifUserExists = check("id").custom(async (id) => {
  const userExists = await UserModel.findById(id);
  if (!userExists) throw new Error(`There is no user with the id '${id}'`);
});
