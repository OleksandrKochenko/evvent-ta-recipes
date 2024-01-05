"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const { PORT = 8000, DB_HOST } = process.env;
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
mongoose_1.default
    .connect(DB_HOST)
    .then(() => {
    app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT} !`));
})
    .catch((error) => {
    console.log(error.message);
    process.exit(1);
});
