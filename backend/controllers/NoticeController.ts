import express from "express"
import { Request, Response } from "express";
import NoticeSerice from "../services/NoticeService";

export default class NoticeController{
    router = express.Router();
        constructor(private noticeService: NoticeSerice){}


    getAllNotices = async (req: Request, res: Response) => {
        let getAllNotice = await this.noticeService.getAllNotice();

        res.status(200).json({msg: "from all Notices", getAllNotice})
    }

}