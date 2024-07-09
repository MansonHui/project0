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

  getNoticeDetails = async (req: Request, res: Response) => {
    console.log("check req body", req.body);

    try {
      const getNoticeDetail = await this.noticeService.getNoticeDetail(
        req.body.userRole,
        req.body.userRoleId,
        parseInt(req.query.noticeId! as string),
        parseInt(req.query.studentId! as string)
      );

      console.log("check getDetail", getNoticeDetail.rows[0]);

      res.status(200).json({
        msg: "from Notice Detail",
        getNoticeDetail: getNoticeDetail.rows,
      });
    } catch (error) {
      console.error("Error in getNoticeDetails:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching notice details" });
    }
  };

  insertChoice = async (req: Request, res: Response) => {
    try {
      // 是req.query ,不是Pararms
      const { studentId, noticeId } = req.query;
      console.log("1",studentId, noticeId);
      
      //錯名
      const { noticeChoiceId } = req.body;
      console.log("2",req.body.noticeChoiceId);
      
      const studentIdNumber = Number(studentId);
      const noticeIdNumber = Number(noticeId);
      
        await this.noticeService.insertChoice(
          studentIdNumber,
          noticeIdNumber,
          noticeChoiceId
        
      );
      res.status(200).json({ message: 'Record updated' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating record', error });
    }
  }
}
