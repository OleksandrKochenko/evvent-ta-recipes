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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIngredients = exports.getAllCategories = void 0;
const models_1 = require("../models");
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
const getAllIngredients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredients = yield models_1.models.Ingredient.find();
        res.json(ingredients);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllIngredients = getAllIngredients;
