import { Router } from "express";
import { loginAuthController, logoutAuthController, registerAuthController } from "../controller/authController.js";

const authRoutes = Router();

authRoutes.post("/login", loginAuthController);
authRoutes.post("/register", registerAuthController);
authRoutes.get("/logout", logoutAuthController);

export default authRoutes;