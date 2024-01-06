import Joi from "joi";
import { messageRequires, userEmailRegExp } from "./constants";

export const userSignUpSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "any.required": `${messageRequires}`,
    }),
  email: Joi.string()
    .pattern(userEmailRegExp)
    .required()
    .messages({
      "any.required": `${messageRequires}`,
      "string.pattern.base": `invalid email`,
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "any.required": `${messageRequires}`,
      "string.min": "invalid length of password",
    }),
});

export const userSignInSchema = Joi.object({
  email: Joi.string()
    .pattern(userEmailRegExp)
    .required()
    .messages({
      "any.required": `${messageRequires}`,
      "string.pattern.base": `invalid email`,
    }),
  password: Joi.string()
    .required()
    .messages({
      "any.required": `${messageRequires}`,
    }),
});
