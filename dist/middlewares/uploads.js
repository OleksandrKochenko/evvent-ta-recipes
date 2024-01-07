"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const destination = path_1.default.resolve("temp");
const storage = multer_1.default.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const { originalname } = file;
        const filename = `${uniquePreffix}_${originalname}`;
        cb(null, filename);
    },
});
exports.upload = (0, multer_1.default)({ storage });
