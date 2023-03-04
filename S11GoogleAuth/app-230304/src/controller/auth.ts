import { generateJwt } from "./../helpers/jwt";
import { Request, Response } from "express";
import { validatePassword } from "../helpers/helpers";
import UserModel from "../models/User";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User with provided email not found.",
      });
    }

    const isPasswordValid = await validatePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Incorrect password.",
      });
    }

    const token = await generateJwt(user.id);

    return res.status(200).json({
      message: "User authenticated successfully.",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ error, msg: "Error" });
  }
};
