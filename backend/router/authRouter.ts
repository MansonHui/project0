import { Router } from "express";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthService";
import { knex } from "../utils/knex";
import { checkToken } from "../utils/guard";
import { isSuperAdmin } from "../utils/isSuperAdmin";

export const authRouter = Router();
const authService = new AuthService(knex);

let authController = new AuthController(authService);

authRouter.post(
  "/superadmin",
  checkToken,
  isSuperAdmin,
  authController.superAdmin
);
authRouter.post("/parentregiser", authController.parentRegiser);

authRouter.post("/login", authController.login);
