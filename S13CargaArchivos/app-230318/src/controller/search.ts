import {
  searchCategories,
  searchProducts,
  searchUsers,
} from "./../helpers/dbHelpers";
import { Request, Response } from "express";
import { VALID_COLLECTIONS } from "../constants/constants";

export const search = async (req: Request, res: Response) => {
  const { collection, term } = req.params;

  switch (collection) {
    case "users":
      await searchUsers(term, res);
      break;

    case "categories":
      await searchCategories(term, res);
      break;

    case "products":
      await searchProducts(term, res);
      break;

    default:
      res.status(500).json({ msg: "This search is not implemented" });
      break;
  }
};
