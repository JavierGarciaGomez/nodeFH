import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, loginUser, renewToken } from "../controller/auth";
import { validateFields, validateJwt } from "../middlewares/";

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

router.get("/", validateJwt, renewToken);

export default router;
