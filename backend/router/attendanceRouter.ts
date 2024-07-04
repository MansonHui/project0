import { Router } from "express";
import { knex } from "../utils/knex";

import AttendanceController from "../controllers/AttendanceController";
import AttendanceService from "../services/AttendanceService";
import { checkToken } from "../utils/guard";

export const attendanceRouter = Router();
const attendanceService = new AttendanceService(knex);
let attendanceController = new AttendanceController(attendanceService);

attendanceRouter.get(
  "/getAllattendance",
  checkToken,
  attendanceController.getAllattendances
);
