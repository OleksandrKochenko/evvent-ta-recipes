import { Request, Response, NextFunction } from "express";
import { userSignUpSchema } from "../helpers/joiSchemas";
import { HttpError } from "../helpers/HttpError";

export const validateUserSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSignUpSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};
