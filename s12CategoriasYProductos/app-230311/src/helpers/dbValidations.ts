import { check } from "express-validator";
import { Model } from "mongoose";
import { CategoryModel, ProductModel, RoleModel, UserModel } from "../models";

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

export const checkProductNameUniqueness = check("name").custom(async (name) => {
  if (name) {
    name = name.toUpperCase();

    const nameExists = await ProductModel.exists({ name });
    if (nameExists) throw new Error(`The name '${name}' is already registered`);
  }
});

export const checkIfCategoryExistsByCategoryId = check("categoryId").custom(
  async (id) => checkIfCategoryExists(id)
);

export const checkIfUserExistsById = check("id").custom(async (id) => {
  checkIfResourceExistById(id, UserModel);
});

export const checkIfCategoryExists = async (id: string) => {
  checkIfResourceExistById(id, CategoryModel);
};

export const checkIfProductExistsById = check("id").custom(async (id) => {
  checkIfResourceExistById(id, ProductModel);
});

export const checkIfCategoryExistsById = check("id").custom(async (id) => {
  checkIfResourceExistById(id, CategoryModel);
});

export const checkIfResourceExistById = async (
  id: string,
  model: Model<any>
) => {
  const resourceExists = await model.findById(id);
  if (!resourceExists)
    throw new Error(`There is no resource with the id '${id}'`);
};
