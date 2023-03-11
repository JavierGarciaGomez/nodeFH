import { NextFunction, Request, Response } from "express";
import { RequestWithUid } from "../interfaces/interfaces";

export const isAdminRole = (
  req: RequestWithUid,
  res: Response,
  next: NextFunction
) => {
  const userRole = req.user?.role ?? "";

  if (userRole !== "ADMIN_ROLE") {
    return res.status(403).json({ msg: "Access denied. User is not an admin" });
  }

  next();
};

export const itHasRole = (...roles: string[]) => {
  return (req: RequestWithUid, res: Response, next: NextFunction) => {
    const userRole = req.user?.role ?? "";
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        msg: "Access denied. User does not have the required role(s)",
      });
    }
    next();
  };
};
