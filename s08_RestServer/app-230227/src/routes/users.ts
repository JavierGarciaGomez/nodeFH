import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "./../controller/users";
import { Request, Response, Router } from "express";

export const router = Router();

router.get("/", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
