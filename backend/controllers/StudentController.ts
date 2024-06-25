import { Request, Response } from "express";
import StudentService from "../services/StudentService";
// import jwtSimple from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

export default class StudentController {
  constructor(private studentService: StudentService) {}

  getstudentData = async (req: Request, res: Response) => {
    console.log("student", req.body);

    if (req.body.userRole === "parent") {
      let studentData = await this.studentService.getStudentDataParent(
        req.body.userId,
        req.body.studentId
      );

      res.json(studentData);
    }

    if (req.body.userRole === "admin") {
      let studentData = await this.studentService.getStudentDataAdmin(
        req.body.userId,
        req.body.studentId
      );

      res.json(studentData);
    }
  };
}
