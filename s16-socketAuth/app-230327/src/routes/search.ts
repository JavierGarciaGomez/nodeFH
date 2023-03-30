import { Router } from "express";
import { search } from "../controller/search";
import { checkValidCollection } from "../helpers/dbValidations";
import { validateFields } from "../middlewares";

const router = Router();

router.get(
  "/:collection/:term",
  [checkValidCollection, validateFields],
  search
);

export default router;
