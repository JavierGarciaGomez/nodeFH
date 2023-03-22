import { ErrorCode, ErrorDetail } from "../interfaces/interfaces";
import { Request, Response } from "express";
export const getError = (
  res = Response,
  statusCode = 500,
  errors: ErrorDetail[]
) => {};

export const getSingleDefaultError = (message: string) => ({
  errorCode: ErrorCode.er01,
  message,
  detail: "A detail",
  help: "Help is not available",
  typeName: "NotManagedError",
});
