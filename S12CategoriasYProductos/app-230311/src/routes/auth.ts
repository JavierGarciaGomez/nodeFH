import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, loginUser } from "../controller/auth";
import { validateFields } from "../middlewares/";

export const router = Router();

router.post("/login", [validateFields], loginUser);

router.post(
  "/googleAuth",
  [
    check("id_token", "The id token is required").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

export default router;
