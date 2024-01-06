import express from "express";
import { logout, signin, signup } from "../controllers/auth.controllers";
import { validateUserSignUp } from "../middlewares/validateUserSignUp";
import { validateUserSignIn } from "../middlewares/validateUserSignIn";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.post("/signup", validateUserSignUp, signup);

router.post("/signin", validateUserSignIn, signin);

router.post("/signout", authenticate, logout);

export const authRouter = router;
