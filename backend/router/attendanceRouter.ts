import { Router } from "express";
import { knex } from "../utils/knex";
import AttendanceService from "../services/attendanceService";
import AttendanceController from "../controllers/AttendanceController";
import { checkToken } from "../utils/guard";

export const attendanceRouter = Router();
const attendanceService = new AttendanceService(knex);
let attendanceController = new AttendanceController(attendanceService);


attendanceRouter.get("/getAllattendance",checkToken,attendanceController.getAllattendances)