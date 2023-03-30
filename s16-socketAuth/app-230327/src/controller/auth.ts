import { generateJwt } from "./../helpers/jwt";
import { Request, Response } from "express";
import { validatePassword } from "../helpers/helpers";
import UserModel from "../models/User";
import { OAuth2Client } from "google-auth-library";
import { googleVerify } from "../helpers/googleVerify";
import { RequestWithUid } from "../interfaces/interfaces";

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

export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { id_token } = req.body;

    const { email, name, picture } = await googleVerify(id_token);
    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        email,
        name,
        imgUrl: picture,
        googleCreated: true,
        password: ":D",
      });

      await user.save();
    }

    if (!user.active) {
      res.status(401).json({ msg: "The user is not active" });
    }

    const token = await generateJwt(user.id);

    res.status(201).json({
      msg: "get API user",
      user,

      token,
    });
  } catch (error) {
    res.status(500).json({ error, msg: "Error" });
  }
};

export const renewToken = async (req: RequestWithUid, res: Response) => {
  const authenticatedUser = req.user;

  // Generar el JWT
  const token = await generateJwt(authenticatedUser!.id);

  res.status(201).json({
    msg: "get API user",
    user: authenticatedUser,
    token,
  });
};
