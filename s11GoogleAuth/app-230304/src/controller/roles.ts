import { Request, Response } from "express";
import RoleModel from "../models/Role";

export const listRoles = async (req: Request, res: Response) => {
  try {
    const roles = await RoleModel.find();

    res.status(200).json({
      msg: "roles",
      roles,
    });
  } catch (error) {
    res.status(500).json({ error, msg: "Error creating resource" });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;

    const createdRole = await RoleModel.create({ role });
    console.log({ createRole });

    res.status(201).json({
      msg: "created",
      createdRole,
    });
  } catch (error) {
    res.status(500).json({ error, msg: "Error creating resource" });
  }
};
