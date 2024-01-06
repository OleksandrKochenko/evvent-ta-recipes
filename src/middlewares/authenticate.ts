import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { models } from "../models";
import { JwtPayloadWithId, RequestExtended } from "../helpers/customTypes";
import { HttpError } from "../helpers/HttpError";
dotenv.config();
const { SECRET_KEY } = process.env;

export const authenticate = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  const { authorization = "" } = req.headers!;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Unauthorized request"));
  }
  try {
    const { _id } = jwt.verify(token, SECRET_KEY as string) as JwtPayloadWithId;
    const user = await models.User.findById(_id);
    if (!user || !user.token) {
      next(HttpError(401));
    } else {
      req.user = user;
    }
    next();
  } catch {
    next(HttpError(401));
  }
};
