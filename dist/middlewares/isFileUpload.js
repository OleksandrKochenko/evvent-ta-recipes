"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileUpload = void 0;
const HttpError_1 = require("../helpers/HttpError");
const isFileUpload = (req, res, next) => {
    if (!req.file) {
        throw (0, HttpError_1.HttpError)(400, "file upload is required");
    }
    next();
};
exports.isFileUpload = isFileUpload;
