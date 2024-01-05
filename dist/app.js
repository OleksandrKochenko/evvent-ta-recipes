"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const api_routes_1 = require("./routes/api.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const { PORT = 8000, DB_HOST } = process.env;
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
app.use("/api", api_routes_1.apiRouter);
// app.use("/api/recipes", recipesRouter);
// app.use("/api/ingredients", ingredientsRouter);
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, _next) => {
    const { status = 500, message } = err;
    res.status(status).json({ message });
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
