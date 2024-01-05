import express from "express";
import {
  getAllCategories,
  getAllIngredients,
} from "../controllers/api.controllers";

const router = express.Router();

router.get("/categories", getAllCategories);

router.get("/ingredients", getAllIngredients);

export const apiRouter = router;
