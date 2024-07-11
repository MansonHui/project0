import { Router } from "express";
import { knex } from "../utils/knex";
import { checkToken } from "../utils/guard";
import TeacherNoticeService from "../services/TeacherNoticeService";
import TeacherNoticeController from "../controllers/TeacherNoticeController";

export const teacherNoticeRouter = Router();
const teacherNoticeService = new TeacherNoticeService(knex);
let teachernoticeController = new TeacherNoticeController(teacherNoticeService);

teacherNoticeRouter.get(
  "/getTeacherNotice",
  checkToken,
  teachernoticeController.getTeacherNotices
);
teacherNoticeRouter.get(
  "/getTeacherNoticeDetail",
  checkToken,
  teachernoticeController.getTeacherNoticeDetails
);

// teacherNoticeRouter.post(
//   "/getNoticeByNoticeID",
//   checkToken,
//   teachernoticeController.getNoticeByNoticeID
// );
