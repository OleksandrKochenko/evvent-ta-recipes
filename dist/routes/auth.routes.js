"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const validateUserSignUp_1 = require("../middlewares/validateUserSignUp");
const validateUserSignIn_1 = require("../middlewares/validateUserSignIn");
const authenticate_1 = require("../middlewares/authenticate");
const router = express_1.default.Router();
router.post("/signup", validateUserSignUp_1.validateUserSignUp, auth_controllers_1.signup);
router.post("/signin", validateUserSignIn_1.validateUserSignIn, auth_controllers_1.signin);
router.post("/signout", authenticate_1.authenticate, auth_controllers_1.logout);
router.get("/current", authenticate_1.authenticate, auth_controllers_1.getCurrentUser);
exports.authRouter = router;
