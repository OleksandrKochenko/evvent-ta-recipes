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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
const HttpError_1 = require("../helpers/HttpError");
dotenv_1.default.config();
const { SECRET_KEY } = process.env;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next((0, HttpError_1.HttpError)(401, "Unauthorized request"));
    }
    try {
        const { _id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const user = yield models_1.models.User.findById(_id);
        if (!user || !user.token) {
            next((0, HttpError_1.HttpError)(401));
        }
        else {
            req.user = user;
        }
        next();
    }
    catch (_a) {
        next((0, HttpError_1.HttpError)(401));
    }
});
exports.authenticate = authenticate;
