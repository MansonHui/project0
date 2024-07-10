import express from "express";
import { Request, Response } from "express";
import AttendanceService from "../services/AttendanceService";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

export default class AttendanceController {
  router = express.Router();
  constructor(private attendanceService: AttendanceService) {}

  getAllattendances = async (req: Request, res: Response) => {
    let getAllattendance = await this.attendanceService.getAllattendance(
      req.body.userRole,
      req.body.userRoleId
    );

    res.status(200).json({ msg: "get All Attendance", getAllattendance });
  };
}
