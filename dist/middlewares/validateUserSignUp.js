"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSignUp = void 0;
const joiSchemas_1 = require("../helpers/joiSchemas");
const HttpError_1 = require("../helpers/HttpError");
const validateUserSignUp = (req, res, next) => {
    const { error } = joiSchemas_1.userSignUpSchema.validate(req.body);
    if (error) {
        throw (0, HttpError_1.HttpError)(400, error.message);
    }
    next();
};
exports.validateUserSignUp = validateUserSignUp;
