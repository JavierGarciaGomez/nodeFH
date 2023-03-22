import { ApiError } from "./../interfaces/interfaces";
import { Request, Response } from "express";
import { ValidationError } from "express-validator";

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string = "Something went wrong",
  errorCode: string = "errorCode",
  errorType: string = "errorType",
  errors?: ValidationError[] | string[]
) => {
  return res.status(statusCode).json({
    message,
    errorCode,
    errorType,
    errors,
  });
};

export const successResponse = (
  res: Response,
  status = 200,
  message: string,
  data?: any
) => {
  return res.status(status).json({ message, data });
};

export const sendApiError = (res: Response, error: ApiError) =>
  res.status(error.statusCode).json({
    timestamp: error.timestamp,
    statusCode: error.statusCode,
    errors: error.errors,
  });
