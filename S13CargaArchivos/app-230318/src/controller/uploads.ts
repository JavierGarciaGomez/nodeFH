import { Request, Response } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";

export const uploadFiles = async (req: Request, res: Response) => {
  let uploadPath: string;

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ msg: "No files were uploaded." });
  }

  console.log("req.files >>>", req.files); // eslint-disable-line

  const file = req.files.file as UploadedFile;

  uploadPath = path.join(__dirname, "../../uploads/", file.name);

  file.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("File uploaded to " + uploadPath);
  });
};
