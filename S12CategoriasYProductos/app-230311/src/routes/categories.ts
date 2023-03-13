import { Router } from "express";
import { check } from "express-validator";
import {
  checkCategoryNameUniqueness,
  checkIfCategoryExists,
} from "../helpers/dbValidations";
import { validateJwt } from "../middlewares/validateJwt";
import { itHasRole, validateFields } from "../middlewares/";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controller/categories";

const router = Router();

router.get("/", getCategories);
router.get(
  "/:id",
  [
    check("id", "Is not a valid id").isMongoId(),
    checkIfCategoryExists,
    validateFields,
  ],
  getCategoryById
);
router.post(
  "/",
  [
    validateJwt,
    check("name", "Name is a required value").not().isEmpty(),
    checkCategoryNameUniqueness,
    validateFields,
  ],
  createCategory
);
router.put(
  "/:id",
  [
    validateJwt,
    check("id", "Is not a valid id").isMongoId(),
    check("name", "Name is a required value").not().isEmpty(),
    checkIfCategoryExists,
    checkCategoryNameUniqueness,
    validateFields,
  ],
  updateCategory
);
router.delete(
  "/:id",
  [
    validateJwt,
    check("id", "Is not a valid id").isMongoId(),
    itHasRole("ADMIN_ROLE", "SALES_ROLE"),
    checkIfCategoryExists,
    validateFields,
  ],
  deleteCategory
);

export default router;
