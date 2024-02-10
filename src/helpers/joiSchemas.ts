import Joi from "joi";
import { messageRequired, userEmailRegExp } from "./constants";

export const userSignUpSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": messageRequired,
  }),
  email: Joi.string().pattern(userEmailRegExp).required().messages({
    "any.required": messageRequired,
    "string.pattern.base": `invalid email`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": messageRequired,
    "string.min": "invalid length of password",
  }),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(userEmailRegExp).required().messages({
    "any.required": messageRequired,
    "string.pattern.base": `invalid email`,
  }),
  password: Joi.string().required().messages({
    "any.required": messageRequired,
  }),
});

export const recipeAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": messageRequired,
  }),
  category: Joi.string().required().messages({
    "any.required": messageRequired,
  }),
  area: Joi.string(),
  instructions: Joi.string().required().messages({
    "any.required": messageRequired,
  }),
  description: Joi.string(),
  time: Joi.string().required().messages({
    "any.required": messageRequired,
  }),
  youtube: Joi.string(),
  tags: Joi.array(),
  ingredients: Joi.array().min(1),
});
