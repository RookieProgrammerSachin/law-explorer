import { Router } from "express";
import { loginAuthController, registerAuthController } from "../controller/authController.js";

const authRoutes = Router();

authRoutes.post("/login", loginAuthController);
authRoutes.post("/register", registerAuthController);

export default authRoutes;