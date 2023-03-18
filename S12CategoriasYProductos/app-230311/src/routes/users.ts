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
  checkIfUserExistsById,
  checkUserRole,
} from "../helpers/dbValidations";
import { validateJwt } from "../middlewares/validateJwt";
import { itHasRole, isAdminRole, validateFields } from "../middlewares/";

const router = Router();

export enum UserRole {
  ADMIN_ROLE = "admin",
  USER_ROLE = "user",
}

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post(
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
router.put(
  "/:id",
  [
    check("id", "Is not a valid id").isMongoId(),
    checkIfUserExistsById,
    checkUserRole,
    validateFields,
  ],

  updateUser
);
router.delete(
  "/:id",
  [
    validateJwt,
    isAdminRole,
    itHasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Is not a valid id").isMongoId(),
    checkIfUserExistsById,
    validateFields,
  ],
  deleteUser
);

export default router;
