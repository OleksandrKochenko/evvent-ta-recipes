import express, { Request, Response, Application, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";
import { apiRouter } from "./routes/api.routes";
import { ExpressError } from "./helpers/customTypes";

dotenv.config();

const app: Application = express();
const { PORT = 8000, DB_HOST } = process.env;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use("/api", apiRouter);
// app.use("/api/recipes", recipesRouter);
// app.use("/api/ingredients", ingredientsRouter);

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
