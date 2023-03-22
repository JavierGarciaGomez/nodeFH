import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors,
    });
  }
  next();
};
