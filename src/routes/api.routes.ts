import express from "express";
import {
  getAllCategories,
  getIngredients,
  getRecipeById,
  getRecipes,
} from "../controllers/api.controllers";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.use(authenticate);

router.get("/categories", getAllCategories);

router.get("/ingredients", getIngredients);

router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipeById);

export const apiRouter = router;
