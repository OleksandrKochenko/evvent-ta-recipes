import express from "express";
import {
  getAllCategories,
  getIngredients,
  getRecipeById,
  getRecipes,
} from "../controllers/api.controllers";

const router = express.Router();

router.get("/categories", getAllCategories);

router.get("/ingredients", getIngredients);

router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipeById);

export const apiRouter = router;
