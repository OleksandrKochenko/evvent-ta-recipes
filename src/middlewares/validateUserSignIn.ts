import { Request, Response, NextFunction } from "express";
import { userSignInSchema } from "../helpers/joiSchemas";
import { HttpError } from "../helpers/HttpError";

export const validateUserSignIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSignInSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};
