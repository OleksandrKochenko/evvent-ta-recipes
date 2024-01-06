import { Response, NextFunction } from "express";
import { RequestExtended } from "../helpers/customTypes";
import { HttpError } from "../helpers/HttpError";

export const isFileUpload = (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    throw HttpError(400, "file upload is required");
  }
  next();
};
