import { errorResponse } from "./../responses/index";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).array();
  console.log({ errors });

  if (errors.length) {
    return errorResponse(
      res,
      400,
      "myErrorCode",
      "Something went wrong",
      "express-validator error",
      errors
    );
  }
  next();
};
