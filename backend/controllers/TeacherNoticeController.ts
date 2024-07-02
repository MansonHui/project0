import express from "express";
import { Request, Response } from "express";
import TeacherNoticeService from "../services/TeacherNoticeService";

export default class TeacherNoticeController{
    router = express.Router();
    constructor(private teacherNoticeService: TeacherNoticeService){}

    getTeacherNotices = async (req: Request, res:Response) => {
        console.log("check req body", req.body)
        let getTeacherNotice = await this.teacherNoticeService.getTeacherNotice(
            req.body.userRole,
            req.body.userRoleId
        )
        
        res.status(200).json({ msg:"from teacher Notices", getTeacherNotice})
    }
}