import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";
import { promises as fsPromises } from "fs";
import { v4 as uuidv4 } from "uuid";
import { VALID_EXTENSIONS } from "../constants/constants";

export const saveUploadedFile = async (
  files: fileUpload.FileArray,
  folder = "",
  validExtensions = VALID_EXTENSIONS
): Promise<string> => {
  const file = files.file as UploadedFile;
  const fileExt = path.extname(file.name).toLowerCase();

  if (!validExtensions.includes(fileExt.substring(1))) {
    throw new Error(
      `The extension ${fileExt} is not allowed - ${validExtensions}`
    );
  }

  const tempName = uuidv4() + fileExt;
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    folder,
    tempName
  );

  // Create the directory if it doesn't exist
  await fsPromises.mkdir(path.dirname(uploadPath), { recursive: true });

  await new Promise<void>((resolve, reject) => {
    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  return tempName;
};
