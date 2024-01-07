import { Request, Response, NextFunction } from "express";
import { HttpError } from "../helpers/HttpError";
import { recipeAddSchema } from "../helpers/joiSchemas";

export const validateRecipeData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const checkBody = Object.keys(req.body).length;
  if (checkBody === 0) {
    throw HttpError(400, "missing body");
  }
  const { error } = recipeAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};
