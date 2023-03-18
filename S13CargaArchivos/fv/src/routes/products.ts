import {
  checkProductNameUniqueness,
  checkIfCategoryExistsByCategoryId,
  checkIfProductExistsById,
} from "./../helpers/dbValidations";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./../controller/products";
import { Router } from "express";
import { check } from "express-validator";
import { validateJwt } from "../middlewares/validateJwt";
import { itHasRole, validateFields } from "../middlewares";

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  [
    check("id", "Is not a valid id").isMongoId(),
    checkIfProductExistsById,
    validateFields,
  ],
  getProductById
);
router.post(
  "/",
  [
    validateJwt,
    check("name", "Name is a required value").not().isEmpty(),
    check("categoryId", "Is not a valid id").isMongoId(),
    checkIfCategoryExistsByCategoryId,
    checkProductNameUniqueness,
    validateFields,
  ],
  createProduct
);
router.put(
  "/:id",
  [
    validateJwt,
    check("id", "Is not a valid id").isMongoId(),
    checkIfProductExistsById,
    checkProductNameUniqueness,
    validateFields,
  ],
  updateProduct
);
router.delete(
  "/:id",
  [
    validateJwt,
    check("id", "Is not a valid id").isMongoId(),
    itHasRole("ADMIN_ROLE", "SALES_ROLE"),
    checkIfProductExistsById,
    validateFields,
  ],
  deleteProduct
);

export default router;
