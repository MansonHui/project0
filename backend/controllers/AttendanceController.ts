import express from "express"
import { Request, Response } from "express";
import AttendanceService from "../services/attendanceService";


export default class AttendanceController{
    router = express.Router();
    constructor(private attendanceService: AttendanceService){}

    getAllattendances = async (req: Request, res: Response) => {
        let getAllattendance = await this.attendanceService.getAllattendance();

        res.status(200).json ({msg: "get All Attendance", getAllattendance})
    }
}
