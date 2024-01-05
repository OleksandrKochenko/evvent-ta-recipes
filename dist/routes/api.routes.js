"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const api_controllers_1 = require("../controllers/api.controllers");
const router = express_1.default.Router();
router.get("/categories", api_controllers_1.getAllCategories);
router.get("/ingredients", api_controllers_1.getAllIngredients);
exports.apiRouter = router;
