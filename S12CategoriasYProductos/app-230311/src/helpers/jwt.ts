import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/interfaces";

export const generateJwt = (uid: string) => {
  return new Promise((resolve, reject) => {
    const jwtPayload = {
      uid,
    };

    const token = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "1y",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};
