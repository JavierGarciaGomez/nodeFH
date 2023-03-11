import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, loginUser } from "../controller/auth";
import { validateFields } from "../middlewares/";

export const authRouter = Router();

authRouter.post("/login", [validateFields], loginUser);

authRouter.post(
  "/googleAuth",
  [
    check("id_token", "The id token is required").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);
