import express from "express";
import {
  addRecipe,
  deleteRecipe,
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
import { upload } from "../middlewares/uploads";
import { isFileUpload } from "../middlewares/isFileUpload";
import { validateRecipeData } from "../middlewares/validatePecipeData";

const router = express.Router();

router.use(authenticate);

router.get("/categories", getAllCategories);

router.get("/ingredients", getIngredients);

router.get("/recipes", getRecipes);
router.get("/recipes/my", getMyRecipes);
router.get("/recipes/favorites", getFavorites);
router.put("/recipes/favorites/:id", isValidId, updateFavoriteRecipe);
router.get("/recipes/:id", isValidId, getRecipeById);
router.post(
  "/recipes/",
  upload.single("preview"),
  isFileUpload,
  validateRecipeData,
  addRecipe
);
router.delete("/recipes/:id", isValidId, deleteRecipe);

export const apiRouter = router;
