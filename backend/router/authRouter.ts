import { Router } from "express";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import { knex } from "../utils/knex";

export const authRouter = Router();
const authService = new AuthService(knex);

let authController = new AuthController(authService);

authRouter.post("/register", authController.register);
