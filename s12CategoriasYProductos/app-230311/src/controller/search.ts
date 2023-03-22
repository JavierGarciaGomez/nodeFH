import {
  searchCategories,
  searchProducts,
  searchUsers,
} from "./../helpers/dbHelpers";
import { Request, Response } from "express";

const allowedCollections = ["users", "categories", "products", "roles"];
export const search = async (req: Request, res: Response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `The allowed collections are ${allowedCollections}`,
    });
  }

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
