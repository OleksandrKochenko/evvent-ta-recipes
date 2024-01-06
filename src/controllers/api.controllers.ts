import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import fs from "fs/promises";
import { models } from "../models";
import { HttpError } from "../helpers/HttpError";
import { RequestExtended } from "../helpers/customTypes";
import { limit } from "../helpers/constants";
import { cloudinaryLib } from "../helpers/cloudinary";

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
  req: RequestExtended,
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
  req: RequestExtended,
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

export const updateFavoriteRecipe = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId } = req.user!;
    const { id: recipeId } = req.params!;

    const recipe = await models.Recipe.findById(recipeId);
    if (!recipe) throw HttpError(404, `Recipe with id ${recipeId} not found`);

    const favoriteRecipe = await models.Recipe.findOne({
      _id: recipeId,
      favorite: { $in: userId },
    });

    if (favoriteRecipe) {
      await models.Recipe.findByIdAndUpdate(
        { _id: recipeId },
        { $pull: { favorite: userId } }
      );
      res.json({
        message: `Recipe with id ${recipeId} removed from favorites`,
      });
    } else {
      await models.Recipe.findByIdAndUpdate(
        { _id: recipeId },
        { $push: { favorite: userId } }
      );
      res.json({
        message: `Recipe with id ${recipeId} added to favorites`,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const addRecipe = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: owner } = req.user!;
    const { path: oldPath } = req.file!;

    const newPath = oldPath.replace(/\.[^/.]+$/, "") + ".webp";
    await sharp(oldPath).webp({ quality: 60 }).toFile(newPath);

    console.log("body", req.body);

    const fileData = await cloudinaryLib.uploader.upload(newPath, {
      folder: "recipes",
    });

    const preview = fileData.url;
    const insertIdx = preview.indexOf("upload/");

    // creats url for compressed preview img
    const thumb =
      preview.slice(0, insertIdx) +
      "upload/q_30/" +
      preview.slice(insertIdx + 7);

    await fs.unlink(oldPath);
    await fs.unlink(newPath);

    const recipe = await models.Recipe.create({
      ...req.body,
      preview,
      thumb,
      owner,
    });
    res.json({ message: "New recipe created", id: recipe._id });
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: owner } = req.user!;
    const { id: recipeId } = req.params!;

    const recipe = await models.Recipe.findOne({ _id: recipeId, owner });
    if (!recipe) throw HttpError(404, `Recipe with id ${recipeId} not found`);

    await models.Recipe.deleteOne({ _id: recipeId, owner });

    res.json({ message: "Recipe deleted", id: recipeId });
  } catch (error) {
    next(error);
  }
};
