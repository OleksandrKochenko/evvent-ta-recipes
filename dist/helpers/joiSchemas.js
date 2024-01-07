"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeAddSchema = exports.userSignInSchema = exports.userSignUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("./constants");
exports.userSignUpSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "any.required": constants_1.messageRequired,
    }),
    email: joi_1.default.string().pattern(constants_1.userEmailRegExp).required().messages({
        "any.required": constants_1.messageRequired,
        "string.pattern.base": `invalid email`,
    }),
    password: joi_1.default.string().min(6).required().messages({
        "any.required": constants_1.messageRequired,
        "string.min": "invalid length of password",
    }),
});
exports.userSignInSchema = joi_1.default.object({
    email: joi_1.default.string().pattern(constants_1.userEmailRegExp).required().messages({
        "any.required": constants_1.messageRequired,
        "string.pattern.base": `invalid email`,
    }),
    password: joi_1.default.string().required().messages({
        "any.required": constants_1.messageRequired,
    }),
});
exports.recipeAddSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "any.required": constants_1.messageRequired,
    }),
    category: joi_1.default.string().required().messages({
        "any.required": constants_1.messageRequired,
    }),
    area: joi_1.default.string(),
    instructions: joi_1.default.string().required().messages({
        "any.required": constants_1.messageRequired,
    }),
    description: joi_1.default.string(),
    time: joi_1.default.string().required().messages({
        "any.required": constants_1.messageRequired,
    }),
    youtube: joi_1.default.string(),
    tags: joi_1.default.array(),
    ingredients: joi_1.default.array(),
});
