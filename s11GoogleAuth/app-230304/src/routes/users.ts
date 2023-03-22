import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./../controller/users";
import { Router } from "express";
import { check } from "express-validator";
import {
  checkEmailUniqueness,
  checkifUserExists,
  checkUserRole,
} from "../helpers/dbValidations";
import { validateJwt } from "../middlewares/validateJwt";
import { itHasRole, isAdminRole, validateFields } from "../middlewares/";

export const usersRouter = Router();

export enum UserRole {
  ADMIN_ROLE = "admin",
  USER_ROLE = "user",
}

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post(
  "/",
  [
    check("name", "Name is a required value").not().isEmpty(),
    check("password", "Password should have at least 6 characters").isLength({
      min: 6,
    }),
    check("email", "The email is not valid").isEmail(),
    checkEmailUniqueness,
    validateFields,
  ],
  createUser
);
usersRouter.put(
  "/:id",
  [
    check("id", "Is not a valid id").isMongoId(),
    checkifUserExists,
    checkUserRole,
    validateFields,
  ],

  updateUser
);
usersRouter.delete(
  "/:id",
  [
    validateJwt,
    isAdminRole,
    itHasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Is not a valid id").isMongoId(),
    checkifUserExists,
    validateFields,
  ],
  deleteUser
);
