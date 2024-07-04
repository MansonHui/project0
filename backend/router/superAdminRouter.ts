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
  "/createStudent",
  checkToken,
  isSuperAdmin,
  superAdminController.createStudent
);

superAdminRouter.post(
  "/createParent",
  checkToken,
  isSuperAdmin,
  superAdminController.createParent
);

superAdminRouter.get(
  "/getAllStudentData",
  checkToken,
  isSuperAdmin,
  superAdminController.getAllStudentData
);

superAdminRouter.post(
  "/uploadStudentImage",
  checkToken,
  isSuperAdmin,
  superAdminController.createStudent
);

superAdminRouter.post(
  "/createNotice",
  checkToken,
  isSuperAdmin,
  superAdminController.createNotices
);
