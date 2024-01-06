import { isValidObjectId } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../helpers/HttpError";

export const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(404, `${id} - Invalid id format`));
  }
  next();
};
