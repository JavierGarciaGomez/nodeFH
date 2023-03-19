import fs from "fs";
import path from "path";
import { errorResponse, sendApiError } from "./../responses/index";
import { Request, Response } from "express";
import { UPLOADS_FOLDER } from "../constants/constants";

import { successResponse } from "../responses";
import { ProductModel, UserModel } from "../models";
import { saveUploadedFile } from "../helpers";
import { getModel } from "../helpers/dbHelpers";

export const uploadSingleFile = async (req: Request, res: Response) => {
  try {
    const filePath = await saveUploadedFile(req.files!, UPLOADS_FOLDER);

    return res.status(200).json({ uploadedFile: filePath });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error: (error as Error).message });
  }
};

export const uploadImg = async (req: Request, res: Response) => {
  try {
    const { id, collection } = req.params;
    const model = await getModel(id, collection);

    // Clean prev img
    if (model?.imgUrl) {
      const imagePath = path.join(
        __dirname,
        "../../uploads",
        collection,
        model.imgUrl
      );
      console.log(imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const fileName = await saveUploadedFile(req.files!, collection, undefined);
    model!.imgUrl = fileName;
    model!.save();
    res.json(model);
  } catch (error) {
    errorResponse(res, 500, "Talk to the administrator", undefined, undefined, [
      (error as Error).message, // Cast the error object to an Error and get its message property
    ]);
  }
};

export const showImg = async (req: Request, res: Response) => {
  try {
    const { id, collection } = req.params;
    const model = await getModel(id, collection);

    if (model?.imgUrl) {
      const pathImagen = path.join(
        __dirname,
        "../../uploads",
        collection,
        model.imgUrl
      );
      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen);
      }
    }

    res.sendFile(path.join(__dirname, "../assets/no-image.jpg"));
  } catch (error) {
    errorResponse(res, 500, "Talk to the administrator", undefined, undefined, [
      (error as Error).message, // Cast the error object to an Error and get its message property
    ]);
  }
};
