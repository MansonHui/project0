import express from "express";
import { Request, Response } from "express";
import NoticeSerice from "../services/NoticeService";

export default class NoticeController {
  router = express.Router();
  constructor(private noticeService: NoticeSerice) {}

  getAllNotices = async (req: Request, res: Response) => {
    console.log("check req body", req.body);
    let getAllNotice = await this.noticeService.getAllNotice(
      req.body.userRole,
      req.body.userRoleId
    );

    res.status(200).json({ msg: "from all Notices", getAllNotice });
  };
}
