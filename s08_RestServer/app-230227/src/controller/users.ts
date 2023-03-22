import { Request, Response, Router } from "express";

export const getUser = (req: Request, res: Response) =>
  res.status(403).json({
    msg: "get API user",
  });

export const createUser = (req: Request, res: Response) => {
  const body = req.body;

  res.status(403).json({
    msg: "get API user",
    user: body,
  });
};

export const updateUser = (req: Request, res: Response) => {
  const params = req.params;
  const query = req.query;

  res.status(403).json({
    msg: "get API id",
    params,
    query,
  });
};

export const deleteUser = (req: Request, res: Response) =>
  res.status(403).json({
    msg: "get API user",
  });
