import { Request, Response, Router } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.status(200).json({ msg: "getUsers", usuarios: users });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (user) {
    res.status(200).json({ msg: "getUser", user });
  }

  res.status(200).json({ msg: "getUser" });
};

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const emailExists = await User.findOne({
      where: {
        email: body?.email,
      },
    });

    if (emailExists) {
      return res.status(400).json({
        msg: "User already registered with email " + body.email,
      });
    }

    const user = await User.create(body);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error, msg: "Error creating user" });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: "There is no user with this id " + id,
      });
    }

    await user.update(body);

    res.json(user);
    res.status(200).json({
      msg: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error, msg: "Error updating user" });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      msg: "There is no user with this id " + id,
    });
  }
  await user.update({ status: false });

  return res.status(200).json({
    msg: "User deleted successfully",
  });
};
