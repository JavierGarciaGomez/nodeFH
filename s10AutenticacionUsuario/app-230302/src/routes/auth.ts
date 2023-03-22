import { Router } from "express";
import { loginUser } from "../controller/auth";
import { validateFields } from "../middlewares/";

export const authRouter = Router();

authRouter.post("/login", [validateFields], loginUser);
