import { Request, Response, NextFunction } from "express";
import { models } from "../models";
import { HttpError } from "../helpers/HttpError";
import { RequestWithUser } from "../helpers/customTypes";
import { limit } from "../helpers/constants";

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

export const getIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;
    const regex = new RegExp(`.*${name}.*`, "i");

    const ingredients = await models.Ingredient.find(
      { name: regex },
      "name"
    ).sort({
      name: 1,
    });
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

export const getRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, category, title, ingredient } = req.query;
    const skip = ((page as number) - 1) * limit;
    const titleRegex = new RegExp(`.*${title}.*`, "i");
    const categoryRegex = new RegExp(
      `.*${category !== "all" ? category : ""}.*`,
      "i"
    );
    const searchCases = [
      { title: titleRegex },
      { category: categoryRegex },
      { "ingredients.id": ingredient },
    ];

    const recipes = await models.Recipe.find(
      {
        $or: [...searchCases],
      },
      "title favorite category description thumb",
      {
        skip,
        limit,
      }
    ).sort({ title: 1 });

    const total = await models.Recipe.find({
      $or: [...searchCases],
    }).countDocuments();

    res.json({ total, recipes });
  } catch (error) {
    next(error);
  }
};

export const getMyRecipes = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: owner } = req.user!;
    const { page = 1 } = req.query!;
    const skip = ((page as number) - 1) * limit;

    const recipes = await models.Recipe.find(
      { owner },
      "title favorite category description thumb owner",
      {
        skip,
        limit,
      }
    ).populate("owner", "name email");

    const total = await models.Recipe.find({ owner }).countDocuments();

    res.json({ total, recipes });
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user!;
    const { page = 1 } = req.query!;
    const skip = ((page as number) - 1) * limit;

    console.log("userId", _id);

    const recipes = await models.Recipe.find(
      { favorite: { $in: [_id] } },
      "title favorite category description thumb",
      {
        skip,
        limit,
      }
    );

    const total = await models.Recipe.find({
      favorite: { $in: [_id] },
    }).countDocuments();

    res.json({ total, recipes });
  } catch (error) {
    next(error);
  }
};

export const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const recipe = await models.Recipe.findById(id).populate("ingredients.id");
    if (!recipe) {
      throw HttpError(404, `Recipe with id ${id} not found`);
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};
