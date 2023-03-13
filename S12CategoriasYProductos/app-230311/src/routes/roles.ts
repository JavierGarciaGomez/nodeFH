import { validateFields } from "../middlewares/";
import { Router } from "express";
import { check } from "express-validator";
import { createRole, listRoles } from "../controller/roles";
import { checkRoleUniqueness } from "../helpers/dbValidations";

export const router = Router();

export enum UserRole {
  ADMIN_ROLE = "admin",
  USER_ROLE = "user",
}
router.get("/", listRoles);

router.post(
  "/",
  [
    check("role", "Role is a required value").not().isEmpty(),
    checkRoleUniqueness,
    validateFields,
  ],

  createRole
);

export default router;
