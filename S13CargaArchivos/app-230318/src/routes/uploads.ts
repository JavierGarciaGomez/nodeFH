import { Router } from "express";
import { check } from "express-validator";
import { uploadFiles } from "../controller/uploads";

const router = Router();

router.post("/", uploadFiles);
export default router;
