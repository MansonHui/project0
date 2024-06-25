import { Router } from "express";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import { knex } from "../utils/knex";
import { checkToken } from "../utils/guard";

export const authRouter = Router();
const authService = new AuthService(knex);

let authController = new AuthController(authService);

authRouter.post("/register", checkToken, authController.register);

authRouter.post("/login", authController.login);