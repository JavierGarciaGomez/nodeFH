import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { errorResponse } from "./../responses/index";
import { Request, Response } from "express";
import { UPLOADS_FOLDER } from "../constants/constants";
import { v2 as cloudinary } from "cloudinary";
import { saveUploadedFile } from "../helpers";
import { getModel } from "../helpers/dbHelpers";

cloudinary.config(process.env.CLOUDINARY_URL!);

export const uploadSingleFile = async (req: Request, res: Response) => {
  try {
    const filePath = await saveUploadedFile(req.files!, UPLOADS_FOLDER);

    return res.status(200).json({ uploadedFile: filePath });
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateImg = async (req: Request, res: Response) => {
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

export const updateImgCloudinary = async (req: Request, res: Response) => {
  try {
    const { id, collection } = req.params;
    const model = await getModel(id, collection);

    // Clean prev img
    if (model?.imgUrl) {
      const nameArray = model.imgUrl.split("/");
      const name = nameArray[nameArray.length - 1];
      const [public_id] = name.split(".");

      await cloudinary.uploader.destroy(`${collection}/${public_id}`);
    }

    const { tempFilePath } = req.files!.file as UploadedFile;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: collection,
    });

    model!.imgUrl = secure_url;

    await model!.save();

    res.json(model);
  } catch (error) {
    console.log({ error });
    errorResponse(res, 500, "Talk to the administrator", undefined, undefined, [
      (error as Error).message, // Cast the error object to an Error and get its message property
    ]);
  }
};
