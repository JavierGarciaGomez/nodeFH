import { Request, Response } from "express";
import UserModel from "../models/User";
import { createHashedPassword } from "../helpers/helpers";
import { RequestWithUid } from "../interfaces/interfaces";

export const getUsers = async (req: Request, res: Response) => {
  const { limit, skip } = req.query;

  const [count, users] = await Promise.all([
    UserModel.countDocuments({ active: true }),
    UserModel.find({ active: true })
      .limit(Number(limit) || 10)
      .skip(Number(skip)),
  ]);

  return res.status(403).json({
    msg: "get API user",
    count,
    users,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  return res.status(403).json({
    msg: "get API user",
    user,
  });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, imgUrl, role } = req.body;
    const user = new UserModel({ name, email, password, imgUrl, role });

    user.password = await createHashedPassword(password);
    const createdUser = await user.save();

    res.status(201).json({
      msg: "get API user",
      createdUser,
    });
  } catch (error) {
    res.status(500).json({ error, msg: "Error creating user" });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, google, _id, ...userData } = req.body;

    // Find the user by id
    const user = await UserModel.findById(id);

    if (password) {
      user!.password = await createHashedPassword(password);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
    });

    res.status(200).json({
      msg: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error, msg: "Error updating user" });
  }
};
export const deleteUser = async (req: RequestWithUid, res: Response) => {
  const { id } = req.params;
  const authenticatedUser = req.user;

  // Find the user by id
  const user = await UserModel.findById(id);
  user!.active = false;

  const updatedUser = await UserModel.findByIdAndUpdate(id, user!, {
    new: true,
  });
  return res.status(200).json({
    msg: "User deleted successfully",
    user: updatedUser,
  });
};
