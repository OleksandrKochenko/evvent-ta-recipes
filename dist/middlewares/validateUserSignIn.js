"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSignIn = void 0;
const joiSchemas_1 = require("../helpers/joiSchemas");
const HttpError_1 = require("../helpers/HttpError");
const validateUserSignIn = (req, res, next) => {
    const { error } = joiSchemas_1.userSignInSchema.validate(req.body);
    if (error) {
        throw (0, HttpError_1.HttpError)(400, error.message);
    }
    next();
};
exports.validateUserSignIn = validateUserSignIn;
