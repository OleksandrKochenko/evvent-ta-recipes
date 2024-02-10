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
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_docs_json_1 = __importDefault(require("./swagger.docs.json"));
const swagger_config_1 = __importDefault(require("./swagger.config"));
const api_routes_1 = require("./routes/api.routes");
const auth_routes_1 = require("./routes/auth.routes");
dotenv_1.default.config();
const { PORT = 8000, DB_HOST } = process.env;
const app = (0, express_1.default)();
app.set("tmp", path_1.default.join(__dirname, "/tmp"));
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", swagger_ui_express_1.default.serve);
app.get("/", swagger_ui_express_1.default.setup(swagger_docs_json_1.default, swagger_config_1.default));
app.use("/api", api_routes_1.apiRouter);
app.use("/auth", auth_routes_1.authRouter);
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
