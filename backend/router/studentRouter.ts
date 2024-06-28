import { Router } from "express";
import StudentController from "../controllers/StudentController";
import { knex } from "../utils/knex";
import StudentService from "../services/StudentService";
import { checkToken } from "../utils/guard";

export const studentRouter = Router();
const studentService = new StudentService(knex);

let studentController = new StudentController(studentService);

studentRouter.post(
  "/studentData",
  checkToken,
  studentController.getstudentData
);

studentRouter.get(
  "/getStudentData",
  checkToken,
  studentController.getstudentData
)