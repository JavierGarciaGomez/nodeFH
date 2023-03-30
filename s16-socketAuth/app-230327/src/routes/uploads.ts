import { Router } from "express";
import {
  showImg,
  updateImg,
  updateImgCloudinary,
  uploadSingleFile,
} from "../controller/uploads";
import { checkIsMongoId, checkValidCollection } from "../helpers/dbValidations";
import { validateFields } from "../middlewares";
import { validateFile } from "../middlewares/validateFile";

const router = Router();

router.post("/", [validateFile, validateFields], uploadSingleFile);
router.put(
  "/:collection/:id",
  [validateFile, checkIsMongoId, checkValidCollection, validateFields],
  updateImgCloudinary
  //  updateImg
);
router.get(
  "/:collection/:id",
  [checkIsMongoId, checkValidCollection, validateFields],
  showImg
);
export default router;
