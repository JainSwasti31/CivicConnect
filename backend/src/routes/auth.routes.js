import { Router } from "express";
import { loginUser, registerUser, getProfile } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyJWT, getProfile);
export default router;
