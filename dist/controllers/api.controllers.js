"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.addRecipe = exports.updateFavoriteRecipe = exports.getRecipeById = exports.getFavorites = exports.getMyRecipes = exports.getRecipes = exports.getIngredients = exports.getAllCategories = void 0;
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = __importDefault(require("fs/promises"));
const models_1 = require("../models");
const HttpError_1 = require("../helpers/HttpError");
const constants_1 = require("../helpers/constants");
const cloudinary_1 = require("../helpers/cloudinary");
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield models_1.models.Category.find().sort({ name: 1 });
        res.json(categories);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCategories = getAllCategories;
const getIngredients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const regex = new RegExp(`.*${name}.*`, "i");
        const ingredients = yield models_1.models.Ingredient.find({ name: regex }, "name").sort({
            name: 1,
        });
        res.json(ingredients);
    }
    catch (error) {
        next(error);
    }
});
exports.getIngredients = getIngredients;
const getRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, category, title, ingredient } = req.query;
        const skip = (page - 1) * constants_1.limit;
        const titleRegex = new RegExp(`.*${title}.*`, "i");
        const categoryRegex = new RegExp(`.*${category !== "all" ? category : ""}.*`, "i");
        const searchCases = [
            { title: titleRegex },
            { category: categoryRegex },
            { "ingredients.id": ingredient },
        ];
        const recipes = yield models_1.models.Recipe.find({
            $or: [...searchCases],
        }, "title favorite category description thumb", {
            skip,
            limit: constants_1.limit,
        }).sort({ title: 1 });
        const total = yield models_1.models.Recipe.find({
            $or: [...searchCases],
        }).countDocuments();
        res.json({ total, recipes });
    }
    catch (error) {
        next(error);
    }
});
exports.getRecipes = getRecipes;
const getMyRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: owner } = req.user;
        const { page = 1 } = req.query;
        const skip = (page - 1) * constants_1.limit;
        const recipes = yield models_1.models.Recipe.find({ owner }, "title favorite category description thumb owner", {
            skip,
            limit: constants_1.limit,
        }).populate("owner", "name email");
        const total = yield models_1.models.Recipe.find({ owner }).countDocuments();
        res.json({ total, recipes });
    }
    catch (error) {
        next(error);
    }
});
exports.getMyRecipes = getMyRecipes;
const getFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { page = 1 } = req.query;
        const skip = (page - 1) * constants_1.limit;
        console.log("userId", _id);
        const recipes = yield models_1.models.Recipe.find({ favorite: { $in: [_id] } }, "title favorite category description thumb", {
            skip,
            limit: constants_1.limit,
        });
        const total = yield models_1.models.Recipe.find({
            favorite: { $in: [_id] },
        }).countDocuments();
        res.json({ total, recipes });
    }
    catch (error) {
        next(error);
    }
});
exports.getFavorites = getFavorites;
const getRecipeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const recipe = yield models_1.models.Recipe.findById(id).populate("ingredients.id");
        if (!recipe) {
            throw (0, HttpError_1.HttpError)(404, `Recipe with id ${id} not found`);
        }
        res.json(recipe);
    }
    catch (error) {
        next(error);
    }
});
exports.getRecipeById = getRecipeById;
const updateFavoriteRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const { id: recipeId } = req.params;
        const recipe = yield models_1.models.Recipe.findById(recipeId);
        if (!recipe)
            throw (0, HttpError_1.HttpError)(404, `Recipe with id ${recipeId} not found`);
        const favoriteRecipe = yield models_1.models.Recipe.findOne({
            _id: recipeId,
            favorite: { $in: userId },
        });
        if (favoriteRecipe) {
            const recipe = yield models_1.models.Recipe.findByIdAndUpdate({ _id: recipeId }, { $pull: { favorite: userId } }, {
                returnDocument: "after",
                fields: {
                    title: 1,
                    favorite: 1,
                    category: 1,
                    description: 1,
                    thumb: 1,
                },
            });
            res.json(recipe);
        }
        else {
            const recipe = yield models_1.models.Recipe.findByIdAndUpdate({ _id: recipeId }, { $push: { favorite: userId } }, {
                returnDocument: "after",
                fields: {
                    title: 1,
                    favorite: 1,
                    category: 1,
                    description: 1,
                    thumb: 1,
                },
            });
            res.json(recipe);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateFavoriteRecipe = updateFavoriteRecipe;
const addRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: owner } = req.user;
        const { path: oldPath } = req.file;
        const newPath = oldPath.replace(/\.[^/.]+$/, "") + ".webp";
        yield (0, sharp_1.default)(oldPath).webp({ quality: 60 }).toFile(newPath);
        const fileData = yield cloudinary_1.cloudinaryLib.uploader.upload(newPath, {
            folder: "recipes",
        });
        const preview = fileData.url;
        const insertIdx = preview.indexOf("upload/");
        // creats url for compressed preview img
        const thumb = preview.slice(0, insertIdx) +
            "upload/q_30/" +
            preview.slice(insertIdx + 7);
        yield promises_1.default.unlink(oldPath);
        yield promises_1.default.unlink(newPath);
        const recipe = yield models_1.models.Recipe.create(Object.assign(Object.assign({}, req.body), { preview,
            thumb,
            owner }));
        res.json({ message: "New recipe created", id: recipe._id });
    }
    catch (error) {
        next(error);
    }
});
exports.addRecipe = addRecipe;
const deleteRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: owner } = req.user;
        const { id: recipeId } = req.params;
        const recipe = yield models_1.models.Recipe.findOne({ _id: recipeId, owner });
        if (!recipe)
            throw (0, HttpError_1.HttpError)(404, `Recipe with id ${recipeId} not found`);
        yield models_1.models.Recipe.deleteOne({ _id: recipeId, owner });
        res.json({ message: "Recipe deleted", id: recipeId });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRecipe = deleteRecipe;
