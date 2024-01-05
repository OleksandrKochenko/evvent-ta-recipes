import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";

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
