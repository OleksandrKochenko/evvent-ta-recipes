import { Request, Response, NextFunction } from "express";
import { models } from "../models";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await models.Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getAllIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredients = await models.Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};
