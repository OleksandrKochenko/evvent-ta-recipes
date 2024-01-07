"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRecipeData = void 0;
const HttpError_1 = require("../helpers/HttpError");
const joiSchemas_1 = require("../helpers/joiSchemas");
const validateRecipeData = (req, res, next) => {
    const checkBody = Object.keys(req.body).length;
    if (checkBody === 0) {
        throw (0, HttpError_1.HttpError)(400, "missing body");
    }
    const { error } = joiSchemas_1.recipeAddSchema.validate(req.body);
    if (error) {
        throw (0, HttpError_1.HttpError)(400, error.message);
    }
    next();
};
exports.validateRecipeData = validateRecipeData;
