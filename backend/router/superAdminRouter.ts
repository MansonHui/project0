import { Router } from "express";
import SuperAdminController from "../controllers/SuperAdminController";
import SuperAdminService from "../services/SuperAdminService";
import { knex } from "../utils/knex";
import { checkToken } from "../utils/guard";
import { isSuperAdmin } from "../utils/isSuperAdmin";

export const superAdminRouter = Router();
const superAdminService = new SuperAdminService(knex);

let superAdminController = new SuperAdminController(superAdminService);

superAdminRouter.post(
  "/createAdmin",
  checkToken,
  isSuperAdmin,
  superAdminController.createAdmin
);

superAdminRouter.post(
  "/createParentAndStudent",
  checkToken,
  isSuperAdmin,
  superAdminController.createParentAndStudent
);
