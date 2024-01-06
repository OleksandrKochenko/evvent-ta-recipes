import express from "express";
import {
  getAllCategories,
  getFavorites,
  getIngredients,
  getMyRecipes,
  getRecipeById,
  getRecipes,
  updateFavoriteRecipe,
} from "../controllers/api.controllers";
import { authenticate } from "../middlewares/authenticate";
import { isValidId } from "../middlewares/isValidId";

const router = express.Router();

router.use(authenticate);

router.get("/categories", getAllCategories);

router.get("/ingredients", getIngredients);

router.get("/recipes", getRecipes);
router.get("/recipes/my", getMyRecipes);
router.get("/recipes/favorites", getFavorites);
router.put("/recipes/favorites/:id", updateFavoriteRecipe);
router.get("/recipes/:id", isValidId, getRecipeById);

export const apiRouter = router;
