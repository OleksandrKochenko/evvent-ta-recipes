import express, { Request, Response, Application, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.docs.json";
import swaggerOptions from "./swagger.config";
import { apiRouter } from "./routes/api.routes";
import { ExpressError } from "./helpers/customTypes";
import { authRouter } from "./routes/auth.routes";

dotenv.config();
const { PORT = 8000, DB_HOST } = process.env;

const app: Application = express();

app.set("tmp", path.join(__dirname, "/tmp"));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(swaggerDocument, swaggerOptions));

app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(
  (
    err: ExpressError,
    req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    const { status = 500, message } = err;
    res.status(status).json({ message });
  }
);

mongoose
  .connect(DB_HOST as string)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is listening at http://localhost:${PORT} !`)
    );
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
