import express from "express"
import { Request, Response } from "express";
import AttendanceAndNoticeService from "../services/AttendanceAndNoticeService";

export default class AttendanceAndNoticeController{
    router = express.Router();
        constructor(private attendanceAndNoticeService:AttendanceAndNoticeService){}

    getAllAttendanceAndNoticeRouters = async (req: Request, res: Response) => {
        let getAllAttendanceAndNotice = await this.attendanceAndNoticeService.getAll(
            req.body.userRole,
            req.body.userRoleId
        );

        res.status(200).json({msg: "from All", getAllAttendanceAndNotice})
    }


}