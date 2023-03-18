import { Types, isValidObjectId } from "mongoose";
import { Response } from "express";
import { CategoryModel, ProductModel, UserModel } from "../models";

export const searchUsers = async (term = "", res: Response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const resource = await UserModel.findById(term);
    return res.status(200).json({ results: resource ? [resource] : [] });
  }

  const regex = new RegExp(term, "i");

  const resources = await UserModel.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ active: true }],
  });
  return res.status(200).json({ results: resources });
};

export const searchCategories = async (term = "", res: Response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const resource = await CategoryModel.findById(term);
    return res.status(200).json({ results: resource ? [resource] : [] });
  }

  const regex = new RegExp(term, "i");

  const resources = await CategoryModel.find({
    $or: [{ name: regex }],
    $and: [{ active: true }],
  });
  return res.status(200).json({ results: resources });
};

export const searchProducts = async (term = "", res: Response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const resource = await ProductModel.findById(term);
    return res.status(200).json({ results: resource ? [resource] : [] });
  }

  const regex = new RegExp(term, "i");

  const resources = await ProductModel.find({
    $or: [{ name: regex }],
    $and: [{ active: true }],
  });
  return res.status(200).json({ results: resources });
};
