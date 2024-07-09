import { Router } from "express";
import { knex } from "../utils/knex";
import { checkToken } from "../utils/guard";
import ForTeacherGetAttendanceService from "../services/ForTeacherGetAttendanceService";
import ForTeacherGetAttendanceController from "../controllers/ForTeacherGetAttendanceController";

export const forTeacherGetAttendanceRouter = Router();
const forTeacherGetAttendanceService = new ForTeacherGetAttendanceService(knex);
let forTeacherGetAttendanceController = new ForTeacherGetAttendanceController(forTeacherGetAttendanceService)

forTeacherGetAttendanceRouter.get("/getForTeacherGetAttendance",checkToken,forTeacherGetAttendanceController.getForTeacherGetAttendances)

