import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { models } from "../models";
import { HttpError } from "../helpers/HttpError";
import { avatarBaseUrl, avatarSettings } from "../helpers/constants";
import { RequestWithUser } from "../helpers/customTypes";
dotenv.config();
const { SECRET_KEY } = process.env;

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    const user = await models.User.findOne({ email });
    if (user) throw HttpError(409, "Email already in use");

    const hashedPswrd = await bcrypt.hash(password, 10);

    const avatarLink =
      avatarBaseUrl + `?name=${name.replace(/ /g, "+")}` + avatarSettings;

    const newUser = await models.User.create({
      ...req.body,
      password: hashedPswrd,
      avatarURL: avatarLink,
    });

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({ email });
    if (!user) throw HttpError(401, "Email or password is wrong");

    const pswrdCompare = await bcrypt.compare(password, user.password);
    if (!pswrdCompare) throw HttpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY as string, { expiresIn: "23h" });

    const userSignedIn = await models.User.findByIdAndUpdate(
      user._id,
      { token },
      {
        returnDocument: "after",
        fields: { password: 0, verify: 0, createdAt: 0 },
      }
    );

    res.json(userSignedIn);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user!;
    await models.User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({ message: "Logout success" });
  } catch (error) {
    next(error);
  }
};
