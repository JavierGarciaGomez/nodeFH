import { Request, Response } from "express";
import { ProductModel } from "../models/";

import { RequestWithUid } from "../interfaces/interfaces";

export const getProducts = async (req: Request, res: Response) => {
  const { limit, skip } = req.query;
  const query = { active: true };

  const [count, products] = await Promise.all([
    ProductModel.countDocuments(query),
    ProductModel.find(query)
      .populate("createdBy", "name email imgUrl uid") // populate createdBy field with User document
      .populate("updatedBy", "name email imgUrl uid") // populate updatedBy field with User document
      .populate("category", "name email imgUrl uid") // populate updatedBy field with User document
      .limit(Number(limit) || 10)
      .skip(Number(skip)),
  ]);

  return res.status(200).json({
    msg: "get API resource",
    count,
    products,
  });
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const resource = await ProductModel.findById(id);
  return res.status(200).json({
    msg: "get API resource",
    resource,
  });
};

export const createProduct = async (req: RequestWithUid, res: Response) => {
  try {
    const { name, price, categoryId } = req.body;

    const authenticatedUser = req.user;
    const resource = new ProductModel({
      name: name.toUpperCase(),
      price,
      category: categoryId,
      createdBy: authenticatedUser?._id,
      updatedBy: authenticatedUser?._id,
    });

    const createdResource = await resource.save();

    res.status(201).json({
      msg: "created",
      createdResource,
    });
  } catch (error) {
    res.status(500).json({ error, msg: "Error creating resource" });
  }
};
export const updateProduct = async (req: RequestWithUid, res: Response) => {
  try {
    const { id } = req.params;
    const authenticatedUser = req.user;
    const { name, price, categoryId } = req.body;

    const existentResource = await ProductModel.findById(id);
    existentResource!.updatedBy = authenticatedUser?._id;
    existentResource!.updatedAt = new Date();
    console.log("HEREEE");
    if (name) {
      existentResource!.name = name.toUpperCase();
    }
    existentResource!.price = price;
    existentResource!.category = categoryId;

    const updatedResource = await ProductModel.findByIdAndUpdate(
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
export const deleteProduct = async (req: RequestWithUid, res: Response) => {
  const { id } = req.params;
  const authenticatedUser = req.user;

  const existentResource = await ProductModel.findById(id);
  existentResource!.active = false;
  existentResource!.updatedBy = authenticatedUser?._id;
  existentResource!.updatedAt = new Date();

  const updatedResource = await ProductModel.findByIdAndUpdate(
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
