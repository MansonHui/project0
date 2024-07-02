import { Request, Response } from "express";
import StudentService from "../services/StudentService";
// import jwtSimple from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

export default class StudentController {
  constructor(private studentService: StudentService) {}

  getstudentData = async (req: Request, res: Response) => {
    let studentData = await this.studentService.getAllStudentData(
      req.body.userRole,
      req.body.userRoleId
    );
    console.log("req.body.userRoleEmail", req.body.userRoleEmail);
    res.json(studentData);
  };

  getOwnStudentProfile = async (req: Request, res: Response) => {
  
  };
}
