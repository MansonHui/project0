import { Router } from "express";
import { knex } from "../utils/knex";
import AttendanceAndNoticeService from "../services/AttendanceAndNoticeService";
import AttendanceAndNoticeController from "../controllers/AttendanceAndNoticeController";


export const attendanceAndNoticeRouter = Router();
const attendanceAndNoticeService = new AttendanceAndNoticeService(knex);
let attendanceAndNoticeController = new AttendanceAndNoticeController(attendanceAndNoticeService)

attendanceAndNoticeRouter.get("/MessageAll",attendanceAndNoticeController.getAllAttendanceAndNoticeRouters)