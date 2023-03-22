import { Request, Response } from "express";
import { CategoryModel } from "../models/";

import { RequestWithUid } from "../interfaces/interfaces";

export const getCategories = async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const query = { active: true };

  const [count, categories] = await Promise.all([
    CategoryModel.countDocuments(query),
    CategoryModel.find(query)
      .populate("createdBy", "name email imgUrl uid") // populate createdBy field with User document
      .populate("updatedBy", "name email imgUrl uid") // populate updatedBy field with User document
      .limit(Number(limit) || 10)
      .skip(Number(skip)),
  ]);

  return res.status(200).json({
    msg: "get API resource",
    count,
    categories,
  });
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  return res.status(200).json({
    msg: "get API resource",
    category,
  });
};

export const createCategory = async (req: RequestWithUid, res: Response) => {
  try {
    const { name } = req.body;
    const authenticatedUser = req.user;
    const resource = new CategoryModel({
      name: name.toUpperCase(),
      createdBy: authenticatedUser?._id,
      updatedBy: authenticatedUser?._id,
    });

    // user.password = await createHashedPassword(password);
    const createdResource = await resource.save();

    res.status(201).json({
      msg: "created",
      createdResource,
    });
  } catch (error) {
    res.status(500).json({ error, msg: "Error creating resource" });
  }
};
export const updateCategory = async (req: RequestWithUid, res: Response) => {
  try {
    const { id } = req.params;
    const authenticatedUser = req.user;
    const { name } = req.body;

    const existentResource = await CategoryModel.findById(id);
    existentResource!.updatedBy = authenticatedUser?._id;
    existentResource!.updatedAt = new Date();
    existentResource!.name = name.toUpperCase();

    const updatedResource = await CategoryModel.findByIdAndUpdate(
      id,
      { $set: existentResource! },
      {
        new: true,
      }
    );

    res.status(200).json({
      msg: "Resource updated successfully",
      updatedResource,
    });
  } catch (error) {
    res.status(500).json({ error, msg: "Error updating reource" });
  }
};
export const deleteCategory = async (req: RequestWithUid, res: Response) => {
  const { id } = req.params;
  const authenticatedUser = req.user;

  const existentResource = await CategoryModel.findById(id);
  existentResource!.active = false;
  existentResource!.updatedBy = authenticatedUser?._id;
  existentResource!.updatedAt = new Date();

  const updatedResource = await CategoryModel.findByIdAndUpdate(
    id,
    { $set: existentResource! },
    {
      new: true,
    }
  );
  return res.status(200).json({
    msg: "Resource deleted successfully",
    user: updatedResource,
  });
};
