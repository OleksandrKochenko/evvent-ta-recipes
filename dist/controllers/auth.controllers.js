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
exports.logout = exports.getCurrentUser = exports.signin = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
const HttpError_1 = require("../helpers/HttpError");
const constants_1 = require("../helpers/constants");
dotenv_1.default.config();
const { SECRET_KEY } = process.env;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const user = yield models_1.models.User.findOne({ email });
        if (user)
            throw (0, HttpError_1.HttpError)(409, "Email already in use");
        const hashedPswrd = yield bcryptjs_1.default.hash(password, 10);
        const avatarLink = constants_1.avatarBaseUrl + `?name=${name.replace(/ /g, "+")}` + constants_1.avatarSettings;
        const newUser = yield models_1.models.User.create(Object.assign(Object.assign({}, req.body), { password: hashedPswrd, avatarURL: avatarLink }));
        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            avatarURL: newUser.avatarURL,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield models_1.models.User.findOne({ email });
        if (!user)
            throw (0, HttpError_1.HttpError)(401, "Email or password is wrong");
        const pswrdCompare = yield bcryptjs_1.default.compare(password, user.password);
        if (!pswrdCompare)
            throw (0, HttpError_1.HttpError)(401, "Email or password is wrong");
        const payload = {
            _id: user._id,
        };
        const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "23h" });
        const userSignedIn = yield models_1.models.User.findByIdAndUpdate(user._id, { token }, {
            returnDocument: "after",
            fields: { password: 0, verify: 0, createdAt: 0 },
        });
        res.json({
            user: {
                id: userSignedIn === null || userSignedIn === void 0 ? void 0 : userSignedIn._id,
                name: userSignedIn === null || userSignedIn === void 0 ? void 0 : userSignedIn.name,
                email: userSignedIn === null || userSignedIn === void 0 ? void 0 : userSignedIn.email,
                avatarURL: userSignedIn === null || userSignedIn === void 0 ? void 0 : userSignedIn.avatarURL,
            },
            token: userSignedIn === null || userSignedIn === void 0 ? void 0 : userSignedIn.token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
const getCurrentUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, _id, name, email, avatarURL } = req.user;
    res.json({
        user: { id: _id, name, email, avatarURL },
        token,
    });
});
exports.getCurrentUser = getCurrentUser;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        yield models_1.models.User.findByIdAndUpdate(_id, { token: "" });
        res.status(200).json({ message: "Logout success" });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
